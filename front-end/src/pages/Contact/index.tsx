import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";

import { Banner } from "../../components/PageBanner";
import { FeaturesSection } from "../../components/FeaturesSection";

import addressIcon from '@assets/adress.svg';
import phoneIcon from '@assets/phone.svg';
import clockIcon from '@assets/clock.svg';

const contactSchema = z.object({
  name: z.string().min(2, "Name is required and must be valid"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().optional(),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      console.log("Contact Form Data:", data);
      await new Promise((resolve) => setTimeout(resolve, 800));
      toast.success("Message sent successfully!", {
        style: {
          background: "#2EC1AC",
          color: "#fff",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#2EC1AC",
        },
      });
      reset();
    } catch (error) {
      console.log(error); // TODO tirar dps, debbug
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="w-full bg-white font-poppins">
      <Banner title="Contact" />

      {/* CONTEÚDO PRINCIPAL */}
      <div className="max-w-screen-xl mx-auto px-5 lg:px-0 pt-16 pb-16">
        <div className="text-center mb-20">
          <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
            Get In Touch With Us
          </h2>
          <p className="text-[#9F9F9F] max-w-[644px] mx-auto text-base">
            For More Information About Our Product & Services. Please Feel Free
            To Drop Us An Email. Our Staff Always Be There To Help You Out. Do
            Not Hesitate!
          </p>
        </div>

        <div className="flex flex-col lg:flex-row justify-center gap-10 lg:gap-32">
          {/* LADO ESQUERDO */}
          <div className="flex flex-col gap-10 lg:w-[300px]">

            {/* Address */}
            <div className="flex gap-4">
              <div>
                <img
                  src={addressIcon}
                  alt="Address"
                  className="w-[22px] h-auto"
                />
              </div>
              <div>
                <h3 className="font-bold text-2xl text-black mb-2">Address</h3>
                <p className="text-black text-base leading-relaxed">
                  236 5th SE Avenue, New
                  <br />
                  York NY10000, United
                  <br />
                  States
                </p>
              </div>
            </div>


            {/* Phone */}
            <div className="flex gap-4">
              <div>
                <img src={phoneIcon} alt="Phone" className="w-[30px] h-[30px]" />
              </div>
              <div>
                <h3 className="font-bold text-2xl text-black mb-2">Phone</h3>
                <p className="text-black text-base leading-relaxed">
                  Mobile: +(84) 546-6789
                  <br />
                  Hotline: +(84) 456-6789
                </p>
              </div>
            </div>
  
            {/* Working Time */}
            <div className="flex gap-4">
              <div>
                <img src={clockIcon} alt="Clock" className="w-[23px] h-auto" />
              </div>
              <div>
                <h3 className="font-bold text-2xl text-black mb-2">
                  Working Time
                </h3>
                <p className="text-black text-base leading-relaxed">
                  Monday-Friday: 9:00 - 22:00
                  <br />
                  Saturday-Sunday: 9:00 - 21:00
                </p>
              </div>
            </div>
          </div>

          {/* LADO DIREITO */}
          <div className="lg:w-[530px] pt-4 lg:pt-0">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-9"
            >
              <div className="flex flex-col gap-5">
                <label className="font-medium text-black">Your name</label>
                <div className="relative">
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="Abc"
                    className="w-full border border-[#9F9F9F] rounded-[10px] p-[20px] focus:outline-none focus:ring-1 focus:ring-[#B88E2F] text-black placeholder-[#9F9F9F]"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm absolute -bottom-6 left-1">
                      {errors.name.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <label className="font-medium text-black">Email address</label>
                <div className="relative">
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Abc@def.com"
                    className="w-full border border-[#9F9F9F] rounded-[10px] p-[20px] focus:outline-none focus:ring-1 focus:ring-[#B88E2F] text-black placeholder-[#9F9F9F]"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm absolute -bottom-6 left-1">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <label className="font-medium text-black">Subject</label>
                <input
                  {...register("subject")}
                  type="text"
                  placeholder="This is an optional"
                  className="w-full border border-[#9F9F9F] rounded-[10px] p-[20px] focus:outline-none focus:ring-1 focus:ring-[#B88E2F] text-black placeholder-[#9F9F9F]"
                />
              </div>

              <div className="flex flex-col gap-5">
                <label className="font-medium text-black">Message</label>
                <textarea
                  {...register("message")}
                  rows={4}
                  placeholder="Hi! i'd like to ask about"
                  className="w-full border border-[#9F9F9F] rounded-[10px] p-[20px] focus:outline-none focus:ring-1 focus:ring-[#B88E2F] text-black placeholder-[#9F9F9F] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full lg:w-[237px] bg-[#B88E2F] text-white font-normal py-3.5 rounded-[5px] mt-4 hover:bg-[#a07c2a] transition disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <FeaturesSection />
    </div>
  );
}
