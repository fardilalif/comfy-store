import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import {
  ComplexPaginationContainer,
  OrdersList,
  PaginationContainer,
  SectionTitle,
} from "../components";
import { customFetch } from "../utils/index.jsx";

const ordersQuery = (params, user) => {
  return {
    queryKey: [
      "orders",
      user.username,
      params.page ? parseInt(params.page) : 1,
    ],
    queryFn: () =>
      customFetch.get("/orders", {
        params,
        headers: { Authorization: `Bearer ${user.token}` },
      }),
  };
};

export const loader =
  (store, QueryClient) =>
  async ({ request }) => {
    const user = store.getState().userState.user;

    if (!user) {
      toast.warn("You must be logged in to view orders");
      return redirect("/login");
    }

    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    try {
      const response = await QueryClient.ensureQueryData(
        ordersQuery(params, user)
      );

      return {
        orders: response.data.data,
        meta: response.data.meta,
      };
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        "There was an error placing your order";
      toast.error(errorMessage);

      if (error.response.status === 401 || error.response.status === 403) {
        return redirect("/login");
      }
      return null;
    }
  };

const Orders = () => {
  const { meta } = useLoaderData();

  if (meta.pagination.total < 1) {
    return <SectionTitle text="please make an order" />;
  }

  return (
    <>
      <SectionTitle text="your orders" />
      <OrdersList />
      <ComplexPaginationContainer />
    </>
  );
};
export default Orders;
