const Footer = () => {
  return (
    <>
      <div className="flex h-80 flex-row justify-evenly bg-[#032541] py-20 text-white">
        <div>
          <p className="py-2 text-[20px] font-semibold">THE BASICS</p>
          <ul>
            <li className="py-1">Giới thiệu</li>
            <li className="py-1">Contact Us</li>
            <li className="py-1">API Documentation</li>
            <li className="py-1">API for Business</li>
            <li className="py-1">System Status</li>
          </ul>
        </div>
        <div>
          <p className="py-2 text-[20px] font-semibold">GET INVOLVED</p>
          <ul>
            <li className="py-1">Contribution Bible</li>
            <li className="py-1">Thêm phim mới</li>
            <li className="py-1">Thêm chương trình TV mới</li>
          </ul>
        </div>
        <div>
          <p className="py-2 text-[20px] font-semibold">COMUNITIY</p>
          <ul>
            <li className="py-1">Guidelines</li>
            <li className="py-1">Discussions</li>
            <li className="py-1">Leaderboard</li>
            <li className="py-1">Support Forums</li>
          </ul>
        </div>
        <div>
          <p className="py-2 text-[20px] font-semibold">LEGAL</p>
          <ul>
            <li className="py-1">Terms of Use</li>
            <li className="py-1">API Terms of Use</li>
            <li className="py-1">Privacy Policy</li>
            <li className="py-1">DMCA Policy</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Footer;
