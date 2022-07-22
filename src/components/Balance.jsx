import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Typography,
  CircularProgress,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import styled from "styled-components";

import { copyToClipboard } from "@/utils";

const Loader = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const createRow = (name, value) => ({ name, value });

export const Balance = () => {
  const { wallet } = useParams();
  const [info, setInfo] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    setIsLoading(true);
    fetch(
      `https://api.ton.cat/v2/explorer/getWalletInformation?address=${wallet}`
    )
      .then((res) => res.json())
      .then((json) => {
        setInfo([
          createRow("Адрес", wallet),
          createRow("Баланс", json.result.balance / 1000000000),
        ]);
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
    if (isMounted) fetchData();
    return () => {
      isMounted = false;
    };
  }, [wallet]);

  return (
    <Container>
      <Box p={1}>
        {isLoading || !info ? (
          <Loader>
            <CircularProgress />
          </Loader>
        ) : (
          <>
            <TableContainer
              sx={{
                borderRadius: "10px",
                border: "1px solid rgba(81, 81, 81, 1);",
              }}
              component={Paper}
            >
              <Table aria-label="simple table">
                <TableBody>
                  {!!info &&
                    info.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>{row.name}</TableCell>
                        <TableCell>
                          <code>{row.value}</code>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>
    </Container>
  );
};
