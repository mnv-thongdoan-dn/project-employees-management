
import { Modal } from 'antd';

 const Confirm = ({ contentConfirm, handleOk, handleCancel, title, onConfirm, btnOk, btnCancel }) => {

  return (
    <Modal
      title={ title || "Confirm" }
      visible={onConfirm}
      onOk={() => handleOk()}
      onCancel={() => handleCancel()}
      okText={ btnOk || 'Ok'}
      cancelText={ btnCancel || 'Cancel'}
    >
      <p>{contentConfirm}</p>
    </Modal>
  );
}

export default Confirm;
