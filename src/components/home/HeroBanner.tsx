// Import Styled Components
import {
  HeroContainer,
  ContentWrapper,
  HeroTitle,
  HeroSubtitle,
  SearchForm,
  SearchInput,
  SearchButton,
} from "@styles/HeroBanner.styles";
export interface HeroBannerProps {
  bgImage: string;
}
const HeroBanner = ({ bgImage }: HeroBannerProps) => {
  return (
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
