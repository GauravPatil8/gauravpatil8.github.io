import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import siteData from "@/data/site.json";

const ComingSoon = () => {
  const location = useLocation();
  const content = siteData.utilityPages.comingSoon;

  useEffect(() => {
    console.error("Link not created yet", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">{content.title}</h1>
        <p className="mb-4 text-xl text-muted-foreground">{content.message}</p>
        <Link to="/" className="text-primary underline hover:text-primary/90">
          {content.returnLabel}
        </Link>
      </div>
    </div>
  );
};

export default ComingSoon;
