// src/utils/formatters.test.ts
import { describe, it, expect } from "vitest";
import {
  formatDate,
  formatRuntime,
  formatSlugTitle,
  formatSlugToApi,
  getRatingHexColor,
} from "./formatters"; // Import hàm cần test

describe("formatDate", () => {
  it("should format date correctly", () => {
    expect(formatDate("2023-10-20")).toBe("Oct 20, 2023");
    expect(formatDate("2023-12-25")).toBe("Dec 25, 2023");

    expect(formatDate("2023-10-11")).toBe("Oct 11, 2023");
    expect(formatDate("2000-11-21")).toBe("Nov 21, 2000");
    expect(formatDate("2000-01-03")).toBe("Jan 3, 2000");
    expect(formatDate("2000-04-09")).toBe("Apr 9, 2000");
    expect(formatDate("2000-05-08")).toBe("May 8, 2000");
  });
  it("should return empty string for invalid date", () => {
    expect(formatDate("")).toBe("N/A");
    expect(formatDate(undefined)).toBe("N/A");
  });
});

describe("getRatingHexColor", () => {
  it("should get rating color correctly", () => {
    expect(getRatingHexColor(7)).toBe("#21d07a");
    expect(getRatingHexColor(4)).toBe("#d2d531");
    expect(getRatingHexColor(6.9)).toBe("#d2d531");
    expect(getRatingHexColor(7.1)).toBe("#21d07a");
    expect(getRatingHexColor(3.9)).toBe("#db2360");
    expect(getRatingHexColor(2)).toBe("#db2360");
    expect(getRatingHexColor(1)).toBe("#db2360");
  });
  it("should return empty string for invalid color", () => {
    expect(getRatingHexColor(0)).toBe("#db2360");
  });
});

describe("formatRuntime", () => {
  it("should format runtime correctly", () => {
    expect(formatRuntime(120)).toBe("2h 0m");
    expect(formatRuntime(59)).toBe("59m");
    expect(formatRuntime(60)).toBe("1h 0m");
    expect(formatRuntime(0)).toBe("");
    expect(formatRuntime(90)).toBe("1h 30m");
    expect(formatRuntime(30)).toBe("30m");
  });
});

describe("formatSlugTitle", () => {
  it("should format slug title correctly", () => {
    expect(formatSlugTitle("top-rated")).toBe("Top Rated");
    expect(formatSlugTitle("top-movie")).toBe("Top Movie");
    expect(formatSlugTitle("newest-movie")).toBe("Newest Movie");
    expect(formatSlugTitle("top-search")).toBe("Top Search");
    expect(formatSlugTitle("action-adventure-movie")).toBe("Action Adventure Movie");
    expect(formatSlugTitle("newest-movie-list")).toBe("Newest Movie List");
    expect(formatSlugTitle("popular")).toBe("Popular");
    expect(formatSlugTitle("this-is-the-newest-film-we-have-you-can-see-it-here")).toBe(
      "This Is The Newest Film We Have You Can See It Here",
    );
  });
});

describe("formatSlugApi", () => {
  it("should format slug api correctly", () => {
    expect(formatSlugToApi("top-rated")).toBe("top_rated");
    expect(formatSlugToApi("top-movie")).toBe("top_movie");
    expect(formatSlugToApi("newest-movie")).toBe("newest_movie");
    expect(formatSlugToApi("top-search")).toBe("top_search");
    expect(formatSlugToApi("popular")).toBe("popular");
    expect(formatSlugToApi("this-is-the-newest-film-we-have-you-can-see-it-here")).toBe(
      "this_is_the_newest_film_we_have_you_can_see_it_here",
    );
  });
});
