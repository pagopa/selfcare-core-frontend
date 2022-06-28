import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Grid,
  Link,
  useTheme,
  Tooltip,
} from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { Trans } from 'react-i18next';

type Props = {
  image?: string;
  urlLogo?: string;
  description: string;
  title: string;
  btnAction?: () => void;
  disableBtn: boolean;
  buttonLabel: string;
  urlPublic?: string;
};

export default function NotActiveProductCard({
  image,
  urlLogo,
  description,
  btnAction,
  disableBtn,
  buttonLabel,
  urlPublic,
  title,
}: Props) {
  const theme = useTheme();
  const truncateText = {
    fontSize: theme.typography.fontSize,
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical' as const,
  };

  return (
    <Grid container>
      <Card sx={{ height: '100%', borderRadius: '16px', width: '100%' }}>
        <Grid item xs={12}>
          <Box
            sx={{
              width: '100%',
              height: '191px',
              position: 'relative',
              '&::after': { position: 'absolute' },
            }}
          >
            <CardMedia component="img" height="100%" width="100%" image={image} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            mx={3}
            sx={{
              width: '88px',
              height: '88px',
              borderRadius: theme.shape,
              backgroundColor: 'background.paper',
              marginTop: '-3rem',
              position: 'relative',
              textAlign: 'center',
              '&::after': {
                position: 'absolute',
                display: 'inline-block',
                top: '40px',
                left: '40px',
              },
            }}
            mr={2}
          >
            <img src={urlLogo} style={{ paddingTop: '15px' }} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <CardContent sx={{ height: '100%' }}>
            <Grid container width="100%">
              <Grid item xs={12} mb={1}>
                <Tooltip title={title.length > 21 ? title : ''}>
                  <Typography
                    variant="h6"
                    sx={{
                      ...truncateText,
                      WebkitLineClamp: 1,
                    }}
                  >
                    {title}
                  </Typography>
                </Tooltip>
              </Grid>
              <Grid item xs={12} height="48px">
                <Tooltip title={description.length > 99 ? description : ''}>
                  <Typography
                    sx={{
                      ...truncateText,
                      WebkitLineClamp: 2,
                    }}
                  >
                    {description}
                  </Typography>
                </Tooltip>
              </Grid>
              <Grid
                mt={1}
                height="16px"
                item
                xs={12}
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}
              >
                <Trans i18nKey="discoverMore">
                  <Link
                    sx={{
                      fontSize: 'fontSize',
                      fontWeight: 'fontWeightBold',
                      color: 'primary.main',
                    }}
                    href={urlPublic}
                  >
                    {urlPublic && 'Scopri di più'}
                  </Link>
                </Trans>
              </Grid>
              <Grid
                display="flex"
                alignItems="flex-end"
                justifyContent="flex-end"
                item
                xs={12}
                sx={{ width: '100%' }}
                mt={3}
              >
                <Button
                  onClick={btnAction}
                  disabled={disableBtn}
                  variant="outlined"
                  sx={{
                    height: '40px',
                    fontWeight: 'bold',
                    borderWidth: 'medium',
                    borderColor: '#0073E6',
                    '&:hover': { borderWidth: 'medium', backgroundColor: 'transparent' },
                  }}
                >
                  {buttonLabel}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
      </Card>
    </Grid>
  );
}
