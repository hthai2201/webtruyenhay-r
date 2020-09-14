import moment from 'moment';

const fromNowTime = time => {
  let str = time ? moment(time).fromNow() : '';
  str = str
    .replace(/ago/, 'trước')
    .replace(/seconds/, 'giây')
    .replace(/minutes/, 'phút')
    .replace(/hours/, 'giờ')
    .replace(/days/, 'ngày')
    .replace(/months/, 'tháng')
    .replace(/years /, 'năm')
    .replace(/a few/, 'vài')
    .replace(/a minute/, '1 phút')
    .replace(/a hour/, '1 giờ')
    .replace(/a day/, '1 ngày')
    .replace(/a month/, '1 tháng')
    .replace(/a year/, '1 năm');
  return str;
};
export const Funtional = { fromNowTime };
