import React from "react";

const Footer = () => {
    return (
        <footer className="mt-auto border-t border-zinc-200/80 bg-white py-6 text-xs text-zinc-400">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
                <span>TaskFlow &middot; Shakib Hasan</span>
                <span>React &middot; Node.js &middot; MongoDB</span>
            </div>
        </footer>
    );
};

export default Footer;