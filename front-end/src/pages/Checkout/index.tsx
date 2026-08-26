import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { fetchCep } from "../../api/viacep";
import { Banner } from "../../components/PageBanner";
import { FeaturesSection } from "../../components/FeaturesSection";
import { useCartStore } from "../../store/useCartStore";

const checkoutSchema = z.object({
  firstName: z.string().min(2, "First Name is required"),
  lastName: z.string().min(2, "Last Name is required"),
  companyName: z.string().optional(),
  zipCode: z.string().min(8, "ZIP code must be valid"),
  country: z.string().min(2, "Country / Region is required"),
  streetAddress: z.string().min(5, "Street address is required"),
  city: z.string().min(2, "Town / City is required"),
  province: z.string().min(2, "Province is required"),
  addonAddress: z.string().optional(),
  email: z.string("Invalid email address"),
  additionalInfo: z.string().optional(),
  paymentMethod: z.enum(["bank_transfer", "cash_on_delivery"], {
    message: "Please select a payment method",
  }),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const formatCurrency = (value: number) => {
  return `Rp ${value.toLocaleString("id-ID")}`;
};

export function Checkout() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: "onTouched",
    defaultValues: {
      paymentMethod: "bank_transfer",
    },
  });

  const selectedPayment = useWatch({
    control,
    name: "paymentMethod",
  });

  const getNumericPrice = (price: string, rawPrice?: number) => {
    if (rawPrice !== undefined) return rawPrice;

    const parsed = parseInt(price.replace(/\D/g, ""), 10);
    return isNaN(parsed) ? 0 : parsed;
  };

  const totalAmount = items.reduce(
    (sum, item) =>
      sum + getNumericPrice(item.price, item.rawPrice) * item.quantity,
    0,
  );

  const handleCepBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value;
    if (cep.replace(/\D/g, "").length === 8) {
      const data = await fetchCep(cep);

      if (data) {
        setValue("streetAddress", data.logradouro, { shouldValidate: true });
        setValue("city", data.localidade, { shouldValidate: true });
        setValue("province", data.uf, { shouldValidate: true });
        setValue("country", "Brasil", { shouldValidate: true });
        toast.success("Address found automatically!", { duration: 2000 });
      } else {
        toast.error("CEP not found! Please fill manually.");
      }
    }
  };

  const onSubmit = async (data: CheckoutFormData) => {
    if (items.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    try {
      console.log("Order Data:", data, "Items:", items);
     
      await new Promise((resolve) => setTimeout(resolve, 800));

      toast.success("Order placed successfully!");
      clearCart();
    } catch {
      toast.error("Error placing order.");
    }
  };

  return (
    <div className="w-full bg-white font-poppins">
      <Banner title="Checkout" />

      <div className="max-w-screen-xl mx-auto px-5 lg:px-0 pt-16 pb-24">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-20"
        >
          <div className="w-full lg:w-[608px]">
            <h2 className="text-[36px] font-bold text-black mb-8">
              Billing details
            </h2>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex flex-col gap-3 w-full">
                  <label className="font-medium text-black">First Name</label>
                  <input
                    {...register("firstName")}
                    className={`border ${errors.firstName ? "border-red-500" : "border-[#9F9F9F]"} rounded-[10px] p-[20px] outline-none focus:border-black`}
                  />
                  {errors.firstName && (
                    <span className="text-red-500 text-sm">
                      {errors.firstName.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-3 w-full">
                  <label className="font-medium text-black">Last Name</label>
                  <input
                    {...register("lastName")}
                    className={`border ${errors.lastName ? "border-red-500" : "border-[#9F9F9F]"} rounded-[10px] p-[20px] outline-none focus:border-black`}
                  />
                  {errors.lastName && (
                    <span className="text-red-500 text-sm">
                      {errors.lastName.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label className="font-medium text-black">
                  Company Name (Optional)
                </label>
                <input
                  {...register("companyName")}
                  className="border border-[#9F9F9F] rounded-[10px] p-[20px] outline-none focus:border-black"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label className="font-medium text-black">ZIP code</label>
                <input
                  {...register("zipCode")}
                  onBlur={(e) => {
                    register("zipCode").onBlur(e);
                    handleCepBlur(e);
                  }}
                  className={`border ${errors.zipCode ? "border-red-500" : "border-[#9F9F9F]"} rounded-[10px] p-[20px] outline-none focus:border-black`}
                />
                {errors.zipCode && (
                  <span className="text-red-500 text-sm">
                    {errors.zipCode.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <label className="font-medium text-black">
                  Country / Region
                </label>
                <input
                  {...register("country")}
                  className={`border ${errors.country ? "border-red-500" : "border-[#9F9F9F]"} rounded-[10px] p-[20px] outline-none focus:border-black`}
                />
                {errors.country && (
                  <span className="text-red-500 text-sm">
                    {errors.country.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <label className="font-medium text-black">Street address</label>
                <input
                  {...register("streetAddress")}
                  className={`border ${errors.streetAddress ? "border-red-500" : "border-[#9F9F9F]"} rounded-[10px] p-[20px] outline-none focus:border-black`}
                />
                {errors.streetAddress && (
                  <span className="text-red-500 text-sm">
                    {errors.streetAddress.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <label className="font-medium text-black">Town / City</label>
                <input
                  {...register("city")}
                  className={`border ${errors.city ? "border-red-500" : "border-[#9F9F9F]"} rounded-[10px] p-[20px] outline-none focus:border-black`}
                />
                {errors.city && (
                  <span className="text-red-500 text-sm">
                    {errors.city.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <label className="font-medium text-black">Province</label>
                <input
                  {...register("province")}
                  className={`border ${errors.province ? "border-red-500" : "border-[#9F9F9F]"} rounded-[10px] p-[20px] outline-none focus:border-black`}
                />
                {errors.province && (
                  <span className="text-red-500 text-sm">
                    {errors.province.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <label className="font-medium text-black">Add-on address</label>
                <input
                  {...register("addonAddress")}
                  className="border border-[#9F9F9F] rounded-[10px] p-[20px] outline-none focus:border-black"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label className="font-medium text-black">Email address</label>
                <input
                  {...register("email")}
                  type="email"
                  className={`border ${errors.email ? "border-red-500" : "border-[#9F9F9F]"} rounded-[10px] p-[20px] outline-none focus:border-black`}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-3 mt-4">
                <input
                  {...register("additionalInfo")}
                  placeholder="Additional information"
                  className="border border-[#9F9F9F] rounded-[10px] p-[20px] outline-none focus:border-black placeholder:text-[#9F9F9F]"
                />
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[533px] lg:pt-[80px]">
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-4 border-b border-[#D9D9D9] pb-4">
                <h3 className="text-2xl font-medium text-black">Product</h3>
                <h3 className="text-2xl font-medium text-black">Subtotal</h3>
              </div>

              {items.length === 0 ? (
                <p className="text-center text-[#9F9F9F] my-8">
                  Your cart is empty.
                </p>
              ) : (
                items.map((item) => {
                  const itemTotal =
                    getNumericPrice(item.price, item.rawPrice) * item.quantity;
                  return (
                    <div
                      key={item.id}
                      className="flex justify-between items-center mb-4"
                    >
                      <p className="text-[#9F9F9F] text-base">
                        {item.name}{" "}
                        <span className="text-black ml-2">
                          x {item.quantity}
                        </span>
                      </p>
                      <p className="text-base font-light text-black">
                        {formatCurrency(itemTotal)}
                      </p>
                    </div>
                  );
                })
              )}

              <div className="flex justify-between items-center my-6">
                <p className="text-base text-black">Subtotal</p>
                <p className="text-base font-light text-black">
                  {formatCurrency(totalAmount)}
                </p>
              </div>

              <div className="flex justify-between items-center mb-8 border-b border-[#D9D9D9] pb-8">
                <p className="text-base text-black">Total</p>
                <p className="text-2xl font-bold text-[#B88E2F]">
                  {formatCurrency(totalAmount)}
                </p>
              </div>

              <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    id="bank_transfer"
                    value="bank_transfer"
                    {...register("paymentMethod")}
                    className="w-3.5 h-3.5 accent-black cursor-pointer"
                  />
                  <label
                    htmlFor="bank_transfer"
                    className="text-base font-medium text-black cursor-pointer"
                  >
                    Direct Bank Transfer
                  </label>
                </div>

                {selectedPayment === "bank_transfer" && (
                  <p className="text-[#9F9F9F] text-base font-light text-justify">
                    Make your payment directly into our bank account. Please use
                    your Order ID as the payment reference. Your order will not
                    be shipped until the funds have cleared in our account.
                  </p>
                )}

                <div className="flex items-center gap-3 mt-2">
                  <input
                    type="radio"
                    id="cash_on_delivery"
                    value="cash_on_delivery"
                    {...register("paymentMethod")}
                    className="w-3.5 h-3.5 accent-black cursor-pointer"
                  />
                  <label
                    htmlFor="cash_on_delivery"
                    className="text-base font-medium text-[#9F9F9F] cursor-pointer"
                  >
                    Cash On Delivery
                  </label>
                </div>
                {errors.paymentMethod && (
                  <span className="text-red-500 text-sm">
                    {errors.paymentMethod.message}
                  </span>
                )}
              </div>

              <p className="text-base font-light text-black text-justify mb-10">
                Your personal data will be used to support your experience
                throughout this website, to manage access to your account, and
                for other purposes described in our{" "}
                <span className="font-semibold">privacy policy.</span>
              </p>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting || items.length === 0}
                  className="w-[318px] py-4 rounded-[15px] border border-black text-black font-medium text-xl hover:bg-black hover:text-white transition disabled:opacity-50"
                >
                  {isSubmitting ? "Processing..." : "Place order"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <FeaturesSection />
    </div>
  );
}
