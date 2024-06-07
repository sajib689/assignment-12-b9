

const Team = () => {
    return (
        <section className="bg-white dark:bg-gray-800 dark:text-gray-100">
        <div className="container flex flex-col justify-center p-4 mx-auto md:p-8">
          <p className="p-2 text-sm font-medium tracking-wider text-center uppercase">How it works</p>
          <h2 className="mb-12 text-4xl font-bold leading-none text-center sm:text-5xl">Frequently Asked Questions</h2>
          <div className="flex flex-col divide-y sm:px-8 lg:px-12 xl:px-32 divide-gray-300 dark:divide-gray-300">
            <details>
              <summary className="py-2 outline-none cursor-pointer focus:outline-none focus:underline">How do I get started with ScholarHub?</summary>
              <div className="px-4 pb-4">
                <p className="text-gray-800 dark:text-white">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde neque in fugiat magni, quas animi enim veritatis deleniti ex. Impedit.
                </p>
              </div>
            </details>
            <details>
              <summary className="py-2 outline-none cursor-pointer focus:outline-none focus:underline">What features does ScholarHub offer?</summary>
              <div className="px-4 pb-4">
                <p className="text-gray-800 dark:text-white">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Est aspernatur quae, eos explicabo odit minima libero veniam similique quibusdam doloribus facilis ipsa accusantium vel maiores corrupti! Libero voluptate a doloribus?
                </p>
              </div>
            </details>
            <details>
              <summary className="py-2 outline-none cursor-pointer focus:outline-none focus:underline">How secure is my data on ScholarHub?</summary>
              <div className="px-4 pb-4 space-y-2">
                <p className="text-gray-800 dark:text-white">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut voluptates aspernatur dolores in consequatur doloremque inventore reprehenderit, consequuntur perspiciatis architecto.
                </p>
                <p className="text-gray-800 dark:text-white">
                  Sed consectetur quod tenetur! Voluptatibus culpa incidunt veritatis velit quasi cupiditate unde eaque! Iure, voluptatibus autem eaque unde possimus quae.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>
      

    );
};

export default Team;