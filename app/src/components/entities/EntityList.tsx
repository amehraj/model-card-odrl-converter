import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import EntityCard from "./EntityCard";
import { getAllEntities } from "../../services/entity";
import useModelCards from "../../hooks/useModelCards";

const EntityList: React.FC = () => {
  const [entities, setEntities] = useState([]);
  const publicModelCards = useModelCards();
  const entitiesModelCardsCount = publicModelCards?.reduce(
    (acc: any, cur: any) => {
      if (acc.hasOwnProperty(cur.entity._id)) {
        acc[cur.entity._id] += 1;
      } else {
        acc[cur.entity._id] = 1;
      }
      return acc;
    },
    {}
  );

  useEffect(() => {
    (async () => {
      const fetchedEntities = await getAllEntities();
      setEntities(fetchedEntities);
    })();
  }, []);

  if (!publicModelCards) return <div>Loading model cards...</div>;

  return (
    <>
      <Grid container spacing={4}>
        {entities?.map((entity: any) => (
          <EntityCard
            key={entity._id}
            entity={entity}
            modelCardCount={entitiesModelCardsCount[entity._id] || 0}
          />
        ))}
      </Grid>
    </>
  );
};

export default EntityList;
