import TitleBox from '@pagopa/selfcare-common-frontend/components/TitleBox';

export default function WelcomeDashboard() {
  const title = 'La panoramica del tuo Ente';
  const subTitle = 'Visualizza e gestisci i prodotti PagoPA a cui il tuo Ente ha aderito.';
  return (
    <TitleBox
      title={title}
      subTitle={subTitle}
      mbTitle={2}
      mtTitle={10}
      mbSubTitle={6}
      variantTitle="h1"
      variantSubTitle="h5"
    />
  );
}
