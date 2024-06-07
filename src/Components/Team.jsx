const Team = () => {
    return (
        <section className="bg-white mb-48 dark:bg-gray-800 dark:text-gray-100">
            <div className="container flex flex-col justify-center p-4 mx-auto md:p-8">
                <p className="p-2 text-sm font-medium tracking-wider text-center uppercase">How it works</p>
                <h2 className="mb-12 text-4xl font-bold leading-none text-center sm:text-4xl">Frequently Asked Questions</h2>
                <div className="flex flex-col divide-y sm:px-8 lg:px-12 xl:px-32 divide-gray-300 dark:divide-gray-300">
                    <details>
                        <summary className="py-2 outline-none cursor-pointer focus:outline-none focus:underline">How do I get started with ScholarHub?</summary>
                        <div className="px-4 pb-4">
                            <p className="text-gray-800 dark:text-white">
                                Getting started with ScholarHub is easy! Simply sign up for an account on our website. Once you've created your account, you can start exploring our features and functionalities right away.
                            </p>
                        </div>
                    </details>
                    <details>
                        <summary className="py-2 outline-none cursor-pointer focus:outline-none focus:underline">What features does ScholarHub offer?</summary>
                        <div className="px-4 pb-4">
                            <p className="text-gray-800 dark:text-white">
                                ScholarHub offers a wide range of features designed to enhance your learning experience. You can create and join study groups, access educational resources, collaborate with peers, and much more.
                            </p>
                        </div>
                    </details>
                    <details>
                        <summary className="py-2 outline-none cursor-pointer focus:outline-none focus:underline">How secure is my data on ScholarHub?</summary>
                        <div className="px-4 pb-4 space-y-2">
                            <p className="text-gray-800 dark:text-white">
                                We take the security and privacy of your data very seriously. ScholarHub uses industry-standard security measures to protect your personal information. Your data is encrypted and stored securely.
                            </p>
                            <p className="text-gray-800 dark:text-white">
                                Rest assured that your information is safe with us. We do not share your data with third parties without your consent. For more details, please refer to our Privacy Policy.
                            </p>
                        </div>
                    </details>
                </div>
            </div>
        </section>
    );
};

export default Team;
