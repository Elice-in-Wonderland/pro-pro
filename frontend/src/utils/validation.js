import Toast from '@/components/Toast/Toast';

export default function checkForm(formData) {
  if (formData.title.trim() === '') {
    new Toast({ content: '제목을 입력하세요', type: 'fail' });
    return false;
  }
  if (formData.executionPeriod[0] > formData.executionPeriod[1]) {
    new Toast({
      content: '수행 기간 종료일이 시작일보다 빠릅니다',
      type: 'fail',
    });
    return false;
  }
  if (formData.capacity < 0) {
    new Toast({
      content: '수행 인원을 확인하세요',
      type: 'fail',
    });
    return false;
  }
  if (formData.registerDeadline > formData.executionPeriod[0]) {
    new Toast({ content: '모집 마감일이 시작일 이후입니다', type: 'fail' });
    return false;
  }
  if (new Date(formData.registerDeadline) < new Date()) {
    new Toast({ content: '모집 마감일이 현재보다 빠릅니다', type: 'fail' });
    return false;
  }
  if (formData.stacks.length === 0) {
    new Toast({
      content: '하나 이상의 기술 스택을 선택하세요',
      type: 'fail',
    });
    return false;
  }
  if (formData.content.trim() === '') {
    new Toast({
      content: '내용을 입력하세요',
      type: 'fail',
    });
    return false;
  }
}
