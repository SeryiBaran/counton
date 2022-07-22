import {
  Typography,
  Box,
  Input,
  FormControl,
  InputLabel,
  InputAdornment,
  Container,
  Snackbar,
  CircularProgress,
  Alert,
  Paper,
} from "@mui/material";
import styled from "styled-components";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { sizing } from "@mui/system";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { navigateToWallet } from "@/utils";
import { Loader } from "@/components/Loader";

const StyledHeader = styled(Typography)`
  display: flex;
  gap: 18px;
  align-items: center;
  justify-content: center;
  text-align: center;
  @media (max-width: 750px) {
    svg {
      display: none;
    }
  }
`;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip
);

const options = {
  responsive: true,
  interaction: {
    intersect: false,
  }
};

let labels = ["Вчера", "Сегодня"];

export const Index = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [data, setData] = useState(0);
  const [days, setDays] = useState(14);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (e) => {
    if (!navigateToWallet(e, navigate)) {
      setError(true);
    }
  };
  const fetchData = async () => {
    labels = ["Вчера", "Сегодня"];
    for (let i = 2; i <= days; i++) {
      labels.unshift(i + " дн. назад");
    }
    setIsLoading(true);
    fetch(
      `https://api.coingecko.com/api/v3/coins/the-open-network/market_chart?vs_currency=usd&days=${days}&interval=daily`
    )
      .then((res) => res.json())
      .then((json) => {
        setData({
          labels,
          datasets: [
            {
              fill: true,
              label: "Цена (USD)",
              data: json.prices.map((e) => e),
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
          ],
        });
      })
      .catch((error) => {
        throw new Error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchData();
    }
    return () => {
      isMounted = false;
    };
  }, [days]);

  return (
    <>
      <Container
        sx={{
          flexGrow: "1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box p={1}>
          <StyledHeader variant="h3" component="h1">
            <AccountBalanceWalletIcon sx={{ fontSize: 35 }} />
            Статистика TON кошелька
          </StyledHeader>
          <Typography
            variant="subtitle1"
            gutterBottom
            component="div"
            textAlign="center"
          >
            Введите ID TON кошелька ниже и нажмите <code>Enter</code>
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="id-input">Идентификатор кошелька</InputLabel>
              <Input id="id-input" name="id-input" />
            </FormControl>
          </form>
        </Box>
        {isLoading || !data ? (
          <Loader>
            <CircularProgress />
          </Loader>
        ) : (
          <Box
            p={1}
            sx={{
              width: "100%",
            }}
          >
            <Paper
            >
              <Typography
                variant="h5"
                component="h1"
                sx={{ textAlign: "center" }}
              >
                Цена TON за
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setDays(Number(e.target["days"].value));
                  }}
                >
                  <Input name="days" defaultValue={days} />
                </form>
                дней в USD
              </Typography>
              <Line options={options} data={data} />
            </Paper>
          </Box>
        )}
      </Container>
      <Snackbar open={error}>
        <Alert
          severity="error"
          sx={{ width: "100%" }}
          onClose={() => setError(false)}
        >
          Ошибка! Введен неверный ID!
        </Alert>
      </Snackbar>
    </>
  );
};
