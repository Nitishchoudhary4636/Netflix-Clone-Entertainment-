import {
  LoaderFunctionArgs,
  useLoaderData,
  Link as RouterLink,
} from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { COMMON_TITLES, MAIN_PATH } from "src/constant";
import GridPage from "src/components/GridPage";
import { MEDIA_TYPE } from "src/types/Common";
import { CustomGenre, Genre } from "src/types/Genre";
import { genreSliceEndpoints } from "src/store/slices/genre";
import store from "src/store";

export async function loader({ params }: LoaderFunctionArgs) {
  let genre: CustomGenre | Genre | undefined = COMMON_TITLES.find(
    (t) => t.apiString === (params.genreId as string)
  );
  if (!genre) {
    const genres = await store
      .dispatch(genreSliceEndpoints.getGenres.initiate(MEDIA_TYPE.Movie))
      .unwrap();
    genre = genres?.find((t) => t.id.toString() === (params.genreId as string));
  }

  return genre;
}

export function Component() {
  const genre: CustomGenre | Genre | undefined = useLoaderData() as
    | CustomGenre
    | Genre
    | undefined;

  if (genre) {
    return <GridPage mediaType={MEDIA_TYPE.Movie} genre={genre} />;
  }

  return (
    <Box
      sx={{
        minHeight: "50vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        px: 3,
      }}
    >
      <Typography variant="h5" color="white">
        Genre not found
      </Typography>
      <Button
        component={RouterLink}
        to={`/${MAIN_PATH.browse}`}
        variant="contained"
      >
        Back to browse
      </Button>
    </Box>
  );
}

Component.displayName = "GenreExplore";
