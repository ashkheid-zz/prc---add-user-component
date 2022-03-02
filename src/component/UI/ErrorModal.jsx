import ReactDOM from 'react-dom';
import Card from './Card';
import Button from './Button';
import css from './ErrorModal.module.css';

const Backdrop = (props) => (
  <div className={css.backdrop} onClick={props.onConfirm} />
);

const Overlay = (props) => (
  <Card className={css.modal}>
    <header className={css.header}>
      <h2>{props.title}</h2>
    </header>
    <div className={css.content}>
      <p>{props.message}</p>
    </div>
    <footer className={css.actions}>
      <Button onClick={props.onConfirm}>Okay</Button>
    </footer>
  </Card>
);

const ErrorModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <Overlay
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
        />,
        document.getElementById('overlay-root')
      )}
    </>
  );
};

export default ErrorModal;
