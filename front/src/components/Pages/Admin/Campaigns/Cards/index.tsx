import { memo } from 'react';

import { useSelector } from 'react-redux';

import usePromiseRefresh from '@eduzz/houston-hooks/usePromiseRefresh';
import CartOutlineIcon from '@eduzz/houston-icons/CartOutline';
import MoneyIcon from '@eduzz/houston-icons/Money';
import UpdateIcon from '@eduzz/houston-icons/Update';
import Grid from '@eduzz/houston-ui/Grid';
import styled, { IStyledProp } from '@eduzz/houston-ui/styles/styled';

import Card from './Card';

import { formatMoney } from '@/formatters/money';
import campaignService from '@/services/campaign';
import { selectorUser } from '@/store/selectors';

const CampaignsCards: React.FC<IStyledProp> = ({ className }) => {
  const user = useSelector(selectorUser);

  if (!user) {
    return null;
  }

  const [roi, , roiLoading, roiRefresh] = usePromiseRefresh(async () => {
    const data = await campaignService.graphRoi();
    if (JSON.stringify(data) === '{}') return 'Nenhuma campanha cadastrada';
    return (Number(data) * 100).toFixed(2) + '%';
  }, []);

  const [investment, , investmentLoading, investmentRefresh] = usePromiseRefresh(async () => {
    const data = await campaignService.graphInvestment();
    if (JSON.stringify(data) === '{}') return 'Nenhuma campanha cadastrada';
    return formatMoney(data);
  }, []);

  const [revenues, , revenuesLoading, revenuesRefresh] = usePromiseRefresh(async () => {
    const data = await campaignService.graphRevenues();
    if (JSON.stringify(data) === '{}') return 'Nenhuma campanha cadastrada';
    return formatMoney(data);
  }, []);

  const CardFaturado = () => {
    if (user.email_validated) {
      return (
        <Card
          id='card_revenue'
          title='Valor total faturado'
          value={revenues}
          loading={revenuesLoading}
          onClick={revenuesRefresh}
          icon={CartOutlineIcon}
        />
      );
    } else {
      return <h2>Por favor valide seu email para ver o card de faturamento!</h2>;
    }
  };

  const CardInvestido = () => {
    if (user.email_validated) {
      return (
        <Card
          id='card_investment'
          title='Valor total investido'
          value={investment}
          loading={investmentLoading}
          onClick={investmentRefresh}
          icon={MoneyIcon}
        />
      );
    } else {
      return <h2>Por favor valide seu email para ver o card de investimento!</h2>;
    }
  };
  return (
    <div className={className}>
      <Grid.Row>
        <Grid.Column xs={12} md={4}>
          <Card
            id='card_roi'
            title='média de roi das campanhas'
            value={roi}
            loading={roiLoading}
            onClick={roiRefresh}
            icon={UpdateIcon}
            colored
          />
        </Grid.Column>
        <Grid.Column xs={12} md={4}>
          <CardFaturado />
        </Grid.Column>
        <Grid.Column xs={12} md={4}>
          <CardInvestido />
        </Grid.Column>
      </Grid.Row>
    </div>
  );
};

export default styled(memo(CampaignsCards))`
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`;
