import { API_URL } from "../utils/api";
import { type Donation } from "@/utils/types";
import { Paper, Text, Stack, Group, Title, Card } from "@mantine/core";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function Donation() {

  const [data, setData] = useState<Donation[]>();
  const [total, setTotal] = useState<number>();

  const fetchData = async () => {
    const res = await axios.get<Donation[]>(API_URL);
    setData(res.data);
    let allAmount: number = 0;
    res.data.forEach(e => {
      allAmount += e.amount
    });
    setTotal(allAmount);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card withBorder shadow="xs" bg="gray.3">
      <Group mb={20}>
        <Title order={1} color="gray">
          Total
        </Title>
        <Title order={1} variant="gradient">
          {total}
        </Title>
        <Title order={1} color="gray">
          THB
        </Title>
      </Group>
      <Stack>
        {data?.map((e) =>
          <Paper key={e.id} shadow="xs" p="md">
            <Group>
              <Text>{e.firstName}</Text>
              <Text>{e.lastName}</Text>
              <Text>{e.email}</Text>
              <Text>{e.amount}</Text>
              <Text>{e.time}</Text>
            </Group>
          </Paper>)}
      </Stack>
    </Card>
  );
}
