import { Grid, Paper, styled } from "@mui/material";
import { useCallback } from "react";
import { CONTENT_TYPE } from "src/constants/content";
import { useMasterContext } from "src/context/MasterContext";
import { ContentDataProps } from "src/types";
import { ContentImage } from "./ContentImage";
import { ContentText } from "./ContentText";
import { NewBox } from "./NewBox";

type Props = {
  contentData: ContentDataProps[];
  setContentData: (data: ContentDataProps[]) => void;
};

export const ContentEditor = (props: Props) => {
  const { contentData, setContentData } = props;
  const { isBigDesktop } = useMasterContext();

  // Function set content data:
  const handleUpdateContentData = useCallback(
    (data: ContentDataProps[]) => {
      setContentData(data);
    },
    [setContentData]
  );

  // Define post category:
  const contentComponent = useCallback(
    (id: string | number) => {
      return {
        [CONTENT_TYPE.TEXT]: (
          <ContentText
            id={id}
            data={contentData}
            handleChange={handleUpdateContentData}
          />
        ),
        [CONTENT_TYPE.IMAGE]: (
          <ContentImage
            id={id}
            data={contentData}
            handleChange={handleUpdateContentData}
          />
        ),
      };
    },
    [contentData, handleUpdateContentData]
  );

  // Define post data to component:
  const defineContentComponent = useCallback(
    (data: ContentDataProps) => {
      const type = data?.type;
      if (!type) return null;
      const id = data.id;
      const component = contentComponent(id)[type as CONTENT_TYPE];
      return (
        <Grid key={data.id} item xs={12}>
          {component}
        </Grid>
      );
    },
    [contentComponent]
  );

  // Render post data to component:
  const renderContentData = useCallback(
    () => contentData?.map((val) => defineContentComponent(val)),
    [contentData, defineContentComponent]
  );

  return (
    <Grid item xs={12} xl={10}>
      {isBigDesktop ? (
        <CustomPaper elevation={3}>
          {renderContentData()}
          <NewBox data={contentData} setData={handleUpdateContentData} />
        </CustomPaper>
      ) : (
        <>
          {renderContentData()}
          <NewBox data={contentData} setData={handleUpdateContentData} />
        </>
      )}
    </Grid>
  );
};

const CustomPaper = styled(Paper)({
  padding: 50,
  margin: "50px 0",
});
