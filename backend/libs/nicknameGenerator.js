const axios = require('axios');

const nicknameGenerator = `https://nickname.hwanmoo.kr/?format=json&count=1&max_length=7
`;

exports.generateNickname = async () => {
  const { data } = await axios.get(nicknameGenerator);

  return data.words[0];
};
