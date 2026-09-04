import Image from "next/image";
import { tiktokPosts, videoPreview } from "@/lib/data";

export default function TikTokSection() {
  return (
    <section className="tiktok-section">
      <h2 className="tiktok-title">Made by us, Shared by you</h2>

      <div className="tiktok-grid">
        {tiktokPosts.map((post, i) => (
          <div className="tiktok-card" key={i}>
            <div
              className="card-bg"
              style={{ backgroundImage: `url('${post.bg}')` }}
            ></div>
            <div className="card-overlay">
              <div className="tt-header">
                <div className="tt-avatar">VGN</div>
                <div className="tt-user-info">
                  <span className="tt-name">VGN</span>
                  <span className="tt-handle">vgnlab</span>
                </div>
                <i className="fa-brands fa-tiktok tt-logo"></i>
              </div>

              <div className="tt-center">
                <p className="more-text">More videos on TikTok</p>
                <div className="video-preview">
                  <Image src={videoPreview} alt="preview" width={300} height={500} />
                  <button className="play-btn">
                    <i className="fa-solid fa-play"></i>
                  </button>
                  <i className="fa-solid fa-chevron-left nav-icon left"></i>
                  <i className="fa-solid fa-chevron-right nav-icon right"></i>
                </div>
              </div>

              <div className="tt-side-actions">
                <div className="act-item">
                  <i className="fa-solid fa-heart"></i>
                  <span>{post.likes}</span>
                </div>
                <div className="act-item">
                  <i className="fa-solid fa-comment-dots"></i>
                  <span>{post.comments}</span>
                </div>
                <div className="act-item">
                  <i className="fa-solid fa-share"></i>
                  <span>{post.shares}</span>
                </div>
              </div>

              <div className="tt-footer">
                <p className="video-desc">{post.desc}</p>
                <p className="sound-track">
                  <i className="fa-solid fa-music"></i> {post.sound}
                </p>
                <div className="progress-bar">
                  <div className="progress-fill"></div>
                </div>
                <div className="controls">
                  <div className="ctrl-left">
                    <i className="fa-solid fa-rotate-right"></i>
                    <i className="fa-solid fa-volume-xmark"></i>
                    <span>{post.duration}</span>
                  </div>
                  <i className="fa-solid fa-expand"></i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
