import type { HeroBannerProps } from "@app-types/type";

// Import Styled Components
import {
  HeroContainer,
  ContentWrapper,
  HeroTitle,
  HeroSubtitle,
  SearchForm,
  SearchInput,
  SearchButton,
} from "@styles/heroBanner.styles";

const HeroBanner = ({ bgImage }: HeroBannerProps) => {
  return (
    // Truyền bgImage vào Styled Component để xử lý CSS
    <HeroContainer bgImage={bgImage}>
      <ContentWrapper>
        {/* Text Section */}
        <div>
          <HeroTitle>Welcome.</HeroTitle>
          <HeroSubtitle>
            Millions of movies, TV shows and people to discover. Explore now.
          </HeroSubtitle>
        </div>

        {/* Search Section */}
        {/* Dùng SearchForm (thẻ form) để handle submit chuẩn HTML */}
        <SearchForm onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="inner-search" style={{ width: "100%" }}>
            <SearchInput
              id="inner-search"
              placeholder="Search for a movie, tv show,..."
              autoComplete="off"
            />
            <SearchButton type="submit">Search</SearchButton>
          </label>
        </SearchForm>
      </ContentWrapper>
    </HeroContainer>
  );
};

export default HeroBanner;
