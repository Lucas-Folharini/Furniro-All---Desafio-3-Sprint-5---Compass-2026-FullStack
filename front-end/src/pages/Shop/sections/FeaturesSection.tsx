import trophyIcon from "@assets/trophy.svg";
import guaranteeIcon from "@assets/guarantee.svg";
import shippingIcon from "@assets/shipping.svg";
import customerSupportIcon from "@assets/customer-support.svg";

interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    id: 1,
    icon: trophyIcon,
    title: "High Quality",
    description: "crafted from top materials",
  },
  {
    id: 2,
    icon: guaranteeIcon,
    title: "Warranty Protection",
    description: "Over 2 years",
  },
  {
    id: 3,
    icon: shippingIcon,
    title: "Free Shipping",
    description: "Order over 150 $",
  },
  {
    id: 4,
    icon: customerSupportIcon,
    title: "24 / 7 Support",
    description: "Dedicated support",
  },
];

export function FeaturesSection() {
  return (
    <section className="w-full bg-[#FAF3EA] py-[100px]">
      <div className="w-full max-w-[1334px] mx-auto px-4 xl:px-0 flex flex-wrap lg:flex-nowrap items-center justify-between gap-8 lg:gap-0">
        {features.map((feature) => (
          <div key={feature.id} className="flex items-center gap-[10px]">
            <img
              src={feature.icon}
              alt={feature.title}
              className="w-[60px] h-[60px] object-contain shrink-0"
            />

            <div className="flex flex-col gap-[2px]">
              <h4 className="font-poppins font-semibold text-[25px] leading-[150%] text-[#242424]">
                {feature.title}
              </h4>
              <p className="font-poppins font-medium text-[20px] leading-[150%] text-[#898989]">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
