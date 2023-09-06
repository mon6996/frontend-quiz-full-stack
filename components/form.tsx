import { API_URL } from "@/utils/api";
import { formSchema, type Form } from "@/utils/types";
import { Input, Button, Card, Title, Stack } from "@mantine/core";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";

export default function Form() {
  const rhf = useForm<Form>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
  });
  const { register, handleSubmit, reset, formState } = rhf;
  const { errors, isSubmitting, isValid } = formState;

  const send = async (data: Form) => {
    try {
      const res = await axios.post(`${API_URL}/donate`, data);
      console.log(res.data);
      reset();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Card withBorder shadow="xs" p="xl" bg="cyan.2">
      <Title order={1} color="blue">
        Donate
      </Title>

      <form onSubmit={handleSubmit(send)}>
        <Stack spacing={"xs"}>
          <Input.Wrapper>
            <Input.Label htmlFor="firstName">First Name</Input.Label>
            <Input {...register("firstName")}
              type="text"
              id="firstName"
              disabled={isSubmitting} />
            <ErrorMessage errors={errors} name="firstName" />
          </Input.Wrapper>

          <Input.Wrapper>
            <Input.Label htmlFor="lastName">Last Name</Input.Label>
            <Input {...register("lastName")}
              type="text"
              id="lastName"
              disabled={isSubmitting}
            />
            <ErrorMessage errors={errors} name="lastName" />
          </Input.Wrapper>

          <Input.Wrapper>
            <Input.Label htmlFor="email">Email</Input.Label>
            <Input {...register("email")}
              type="text"
              id="email"
              disabled={isSubmitting}
            />
            <ErrorMessage errors={errors} name="email" />
          </Input.Wrapper>

          <Input.Wrapper>
            <Input.Label htmlFor="amount">Donation Amount</Input.Label>
            <Input {...register("amount")}
              type="text"
              id="amount"
              disabled={isSubmitting}
            />
            <ErrorMessage errors={errors} name="amount" />
          </Input.Wrapper>
          <Button type="submit" disabled={isSubmitting || !isValid}>
            {formState.isSubmitting ? "Working" : "Submit"}
          </Button>
        </Stack>
      </form>
    </Card>
  );
}

