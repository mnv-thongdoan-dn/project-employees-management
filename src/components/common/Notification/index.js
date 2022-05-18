import { notification } from 'antd';

const Notification = (type, message, description) => {
  return notification[type]({
    placement: 'topRight',
    message,
    description,
    duration: 3
  })
}

export default Notification;
