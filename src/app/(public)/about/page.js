import AboutPageContainer from "./_components/AboutPageContainer";

export const metadata = {
  title: "About Us",
  description: "About us page",
};

export default function AboutUsPage() {
  return (
    <div className="px-5 md:px-10 lg:mx-auto lg:w-[90%] 2xl:w-3/4">
      <h1 className="mb-10 text-5xl font-extrabold text-primary-black">
        About Us
      </h1>

      <AboutPageContainer />
    </div>
  );
}
