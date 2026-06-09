import { useMemo } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider, { Settings } from "react-slick";

import MaxLineTypography from "./MaxLineTypography";
import PlayButton from "./PlayButton";
import MoreInfoButton from "./MoreInfoButton";
import { useDetailModal } from "src/providers/DetailModalProvider";
import { MEDIA_TYPE } from "src/types/Common";
import { useGetVideosByMediaTypeAndCustomGenreQuery } from "src/store/slices/discover";
import { useGetConfigurationQuery } from "src/store/slices/configuration";
import { Movie } from "src/types/Movie";
import { resolveImageUrl } from "src/utils/images";

interface TopTrailerProps {
  mediaType: MEDIA_TYPE;
}

export default function TopTrailer({ mediaType }: TopTrailerProps) {
  const { data } = useGetVideosByMediaTypeAndCustomGenreQuery({
    mediaType,
    apiString: "popular",
    page: 1,
  });
  const { data: configuration } = useGetConfigurationQuery();
  const { setDetailType } = useDetailModal();

  const slides = useMemo<Movie[]>(() => {
    if (!data?.results?.length) {
      return [];
    }

    return data.results.filter((item) => !!item.backdrop_path).slice(0, 3);
  }, [data?.results]);

  const settings: Settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 6000,
    speed: 800,
    fade: true,
    pauseOnHover: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (!slides.length) {
    return null;
  }

  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 1,
        mb: 3,
        overflow: "hidden",
        "& .slick-dots": {
          bottom: 20,
          zIndex: 12,
        },
        "& .slick-dots li button:before": {
          color: "common.white",
          opacity: 0.45,
          fontSize: 10,
        },
        "& .slick-dots li.slick-active button:before": {
          opacity: 1,
        },
      }}
    >
      <Slider {...settings}>
        {slides.map((video) => (
          <Box key={video.id}>
            <Box
              sx={{
                position: "relative",
                height: { xs: 430, sm: 500, md: "56.25vw" },
                maxHeight: { md: 760 },
                minHeight: 360,
                backgroundImage: video.backdrop_path
                  ? `url(${resolveImageUrl(
                      video.backdrop_path,
                      configuration?.images.base_url,
                      "original"
                    )})`
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "center center",
              }}
            >
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  position: "absolute",
                  background:
                    "linear-gradient(77deg, rgba(0,0,0,.72) 0%, rgba(0,0,0,.25) 55%, transparent 85%)",
                }}
              />

              <Box
                sx={{
                  backgroundColor: "transparent",
                  backgroundImage:
                    "linear-gradient(180deg,hsla(0,0%,8%,0) 0,hsla(0,0%,8%,.15) 15%,hsla(0,0%,8%,.35) 29%,hsla(0,0%,8%,.58) 44%,#141414 68%,#141414)",
                  backgroundRepeat: "repeat-x",
                  backgroundPosition: "0px top",
                  backgroundSize: "100% 100%",
                  bottom: 0,
                  position: "absolute",
                  left: 0,
                  right: 0,
                  width: "100%",
                  height: { xs: 140, md: "14.7vw" },
                }}
              />

              <Stack
                spacing={4}
                sx={{
                  bottom: { xs: 70, sm: 95, md: "22%" },
                  position: "absolute",
                  left: { xs: "4%", md: "60px" },
                  width: { xs: "88%", md: "40%" },
                  zIndex: 10,
                }}
              >
                <MaxLineTypography variant="h2" maxLine={1} color="text.primary">
                  {video.title}
                </MaxLineTypography>
                <MaxLineTypography variant="h5" maxLine={3} color="text.primary">
                  {video.overview}
                </MaxLineTypography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <PlayButton size="large" />
                  <MoreInfoButton
                    size="large"
                    onClick={() => {
                      setDetailType({ mediaType, id: video.id });
                    }}
                  />
                </Stack>
              </Stack>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
