import { API_URL } from "@/utils/api";
import { type Donation } from "@/utils/types";
import { Input, Button, Card, Title, Stack } from "@mantine/core";
import axios from "axios";
import { useState } from "react";

export default function Form() {

  const send = async (data: any) => {
    try {
      const res = await axios.post(API_URL, data);
      console.log(res.data);
      
    } catch (err) {

    }
  }

  return (
    <Card withBorder shadow="xs" p="xl" bg="cyan.2">
      <Title order={1} color="blue">
        Donate
      </Title>

      <form onSubmit={send}>
        <Stack spacing={"xs"}>
          <Input.Wrapper>
            <Input.Label htmlFor="firstName">First Name</Input.Label>
            <Input id="firstName" />
            <Input.Error>{/* Error goes here */}</Input.Error>
          </Input.Wrapper>

          <Input.Wrapper>
            <Input.Label htmlFor="lastName">Last Name</Input.Label>
            <Input id="lastName" />
            <Input.Error>{/* Error goes here */}</Input.Error>
          </Input.Wrapper>

          <Input.Wrapper>
            <Input.Label htmlFor="email">Email</Input.Label>
            <Input id="email" />
            <Input.Error>{/* Error goes here */}</Input.Error>
          </Input.Wrapper>

          <Input.Wrapper>
            <Input.Label htmlFor="amount">Donation Amount</Input.Label>
            <Input id="amount" />
            <Input.Error>{/* Error goes here */}</Input.Error>
          </Input.Wrapper>
          <Button>Submit</Button>
        </Stack>
      </form>
    </Card>
  );
}
