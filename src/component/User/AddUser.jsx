import { useState, useRef } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import css from './AddUser.module.css';

const AddUser = (props) => {
  const userNameInput = useRef();
  const ageInput = useRef();
  const [error, setError] = useState();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const enteredUserName = userNameInput.current.value.trim();
    const enteredAge = ageInput.current.value.trim();


    if (enteredUserName.length === 0 || enteredAge.length === 0) {
      setError({
        title: '⚠ Invalid input!',
        message: 'Please enter a valid name and age (non-empty values).',
      });
      return;
    }

    if (Number(enteredAge) < 1) {
      setError({
        title: '⚠ Invalid age!',
        message: 'Please enter a valid age (> 0)',
      });
      return;
    }

    props.onAddUser(enteredUserName, enteredAge);
    userNameInput.current.value = '';
    ageInput.current.value = '';
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={css.input}>
        <form onSubmit={onSubmitHandler}>
          <label htmlFor="username">UserName</label>
          <input id="username" type="text" ref={userNameInput} />
          <label htmlFor="age">Age (years)</label>
          <input id="age" type="number" ref={ageInput} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </>
  );
};

export default AddUser;
