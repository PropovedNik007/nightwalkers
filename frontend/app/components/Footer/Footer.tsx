"use client";
/** @jsxRuntime classic */
/** @useClient */

import React, { useState } from 'react';
import Video from '../Video/Video';
import css from './Footer.module.css';
import Link from "next/link";

const Footer = () => {
  const [showVideo, setShowVideo] = useState(false);

  const handleOpenVideo = () => {
    setShowVideo(true);
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
  };

  return (
    <div className={css.footer}>
        <div className="flex gap-6 text-xl text-black font-semibold">
            <Link href={"/"} className="text-black px-2 py-3 bg-zinc-300 border"><button>Logs</button></Link>
            <Link href={"/upload"} className="text-black px-2 py-3 bg-zinc-300 border"><button>Record Video</button></Link>
        </div>

    </div>
  );
};

export default Footer;
