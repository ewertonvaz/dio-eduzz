import { Redirect, useParams } from 'react-router-dom';

import styled from '@eduzz/houston-ui/styles/styled';
import Toast from '@eduzz/houston-ui/Toast';

import { decodeUrl } from '@/helpers/decodeurl';
import authService from '@/services/auth';

type confirEmailParams = {
  user_token: string;
};

const ConfirmEmailPage = () => {
  const { user_token } = useParams<confirEmailParams>();
  const decodedToken = decodeUrl(user_token);

  const validateToken = async () => {
    const result = await authService.confirmEmailAddress(decodedToken);
    const isValid = result.is_valid;
    if (isValid) {
      Toast.info('O seu email foi validado com sucesso. Obrigado.');
    } else {
      Toast.error('Não foi possível validar seu email. Por favor tente mais tarde.');
    }
    return isValid;
  };

  const validated = validateToken();
  console.log(validated);
  return <Redirect to='/login' />;
};

export default styled(ConfirmEmailPage)`
  max-width: 400px;

  & .invalid-token {
    margin-bottom: ${({ theme }) => theme.spacing(4)};
    text-align: center;
  }
`;
