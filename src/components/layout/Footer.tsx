import { Box } from "@mui/material";

import {
  FooterContainer,
  ContentWrapper,
  FooterLogo,
  FooterColumn,
  ColumnTitle,
  FooterLink,
} from "@styles/footer.styles";

const FOOTER_LINKS = [
  {
    title: "THE BASICS",
    items: ["Giới thiệu", "Contact Us", "Support Forums", "API", "System Status"],
  },
  {
    title: "GET INVOLVED",
    items: ["Contribution Bible", "Add New Movie", "Add New TV Show"],
  },
  {
    title: "COMMUNITY",
    items: ["Guidelines", "Discussions", "Leaderboard", "Twitter"],
  },
  {
    title: "LEGAL",
    items: ["Terms of Use", "API Terms of Use", "Privacy Policy", "DMCA Policy"],
  },
];

const Footer = () => {
  return (
    <FooterContainer>
      <ContentWrapper>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <FooterLogo src="/images/movie_logo2.png" alt="Movie App Logo" />
        </Box>

        {FOOTER_LINKS.map((section, index) => (
          <FooterColumn key={index}>
            <ColumnTitle>{section.title}</ColumnTitle>

            {section.items.map((item, idx) => (
              <FooterLink key={idx} href="#" underline="none">
                {item}
              </FooterLink>
            ))}
          </FooterColumn>
        ))}
      </ContentWrapper>
    </FooterContainer>
  );
};

export default Footer;
