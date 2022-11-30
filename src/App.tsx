import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import styles from "./App.module.scss";
import { Header } from "./components/header/Header";
import { NewsList } from "./components/newsList/NewsList";
import { NewsPage } from "./components/newsPage/NewsPage";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { fetchNews } from "./store/actions/news";
import { cleanNews } from "./store/slices/newsSlice";

function App() {
  const dispatch = useAppDispatch();
  const newsId = useAppSelector((state) => state.news.newsListId);

  useEffect(() => {
    dispatch(fetchNews());
    const refreshInterval = setInterval(() => {
      dispatch(cleanNews());
      dispatch(fetchNews());
    }, 60000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <Header />
      <Switch>
        <Route path="/:id" render={() => <NewsPage />} />
        <Route path="/" render={() => <NewsList newsId={newsId} />} />
      </Switch>
    </div>
  );
}

export default App;
