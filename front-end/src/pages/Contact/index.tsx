import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required and must be valid"),
  email: z.email("Please enter a valid email address"),
  subject: z.string().optional(),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export  function Contact() {
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

      // só pra ter um delayzinho, achei melhor visualmente
      await new Promise((resolve) => setTimeout(resolve, 800));

      toast.success("Message sent successfully!");
      reset();
    } catch (error) {
      console.log(error); // TODO tirar dps, debbug
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="w-full bg-white font-poppins pb-16">
      <div className="max-w-screen-xl mx-auto px-5 lg:px-0 pt-16">
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

        {/* Container Principal: */}
        <div className="flex flex-col lg:flex-row justify-center gap-10 lg:gap-32">
          {/* LADO ESQUERDO  */}
          <div className="flex flex-col gap-10 lg:w-[300px]">
            {/* Address */}
            <div className="flex gap-4">
              <div>
                <svg
                  width="22"
                  height="28"
                  viewBox="0 0 22 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 0C4.925 0 0 4.925 0 11C0 19.25 11 28 11 28C11 28 22 19.25 22 11C22 4.925 17.075 0 11 0ZM11 15C8.79 15 7 13.21 7 11C7 8.79 8.79 7 11 7C13.21 7 15 8.79 15 11C15 13.21 13.21 15 11 15Z"
                    fill="black"
                  />
                </svg>
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
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.05 16.27L16.2 15.19C15.84 15.11 15.46 15.21 15.2 15.47L12.06 18.61C9.07 17.09 6.64 14.65 5.12 11.66L8.26 8.52C8.52 8.26 8.62 7.88 8.54 7.52L7.46 2.68C7.36 2.21 6.95 1.88 6.47 1.88H2.81C2.31 1.88 1.88 2.3 1.91 2.81C2.42 12.39 10.15 20.13 19.72 20.64C20.23 20.67 20.65 20.24 20.65 19.74V16.08C20.65 15.6 20.32 15.19 19.85 15.09H21.05Z"
                    fill="black"
                  />
                </svg>
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
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 23 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.5 0C5.152 0 0 5.152 0 11.5C0 17.848 5.152 23 11.5 23C17.848 23 23 17.848 23 11.5C23 5.152 17.848 0 11.5 0ZM11.5 20.7C6.4285 20.7 2.3 16.5715 2.3 11.5C2.3 6.4285 6.4285 2.3 11.5 2.3C16.5715 2.3 20.7 6.4285 20.7 11.5C20.7 16.5715 16.5715 20.7 11.5 20.7ZM12.075 5.75H9.775V12.65L15.8125 16.2725L16.9625 14.3865L12.075 11.5V5.75Z"
                    fill="black"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-2xl text-black mb-2">
                  Working Time
                </h3>
                <p className="text-black text-base leading-relaxed">
                  Monday-Friday: 9:00 -<br />
                  22:00
                  <br />
                  Saturday-Sunday: 9:00 -<br />
                  21:00
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
              {/* Your Name */}
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

              {/* Email address */}
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

              {/* Subject */}
              <div className="flex flex-col gap-5">
                <label className="font-medium text-black">Subject</label>
                <input
                  {...register("subject")}
                  type="text"
                  placeholder="This is an optional"
                  className="w-full border border-[#9F9F9F] rounded-[10px] p-[20px] focus:outline-none focus:ring-1 focus:ring-[#B88E2F] text-black placeholder-[#9F9F9F]"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-5">
                <label className="font-medium text-black">Message</label>
                <textarea
                  {...register("message")}
                  rows={4}
                  placeholder="Hi! i'd like to ask about"
                  className="w-full border border-[#9F9F9F] rounded-[10px] p-[20px] focus:outline-none focus:ring-1 focus:ring-[#B88E2F] text-black placeholder-[#9F9F9F] resize-none"
                />
              </div>

              {/* Submit Button */}
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
    </div>
  );
}
