import styles from './modal.module.scss';

interface ModalProps {
  visible: boolean;
  children: any;
}

export const Modal = ({ children, visible }: ModalProps) => {
  const rootClasses = [styles.modalWrapper];

  if (visible) {
    rootClasses.push(styles.active);
  }

  return (
    <div className={rootClasses.join(' ')}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
