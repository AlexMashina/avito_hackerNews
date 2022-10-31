import React, { FC, memo } from "react";

import styles from "./Header.module.scss";
import { Container } from "../container/Container";
import { Logo } from "../logo/Logo";

export const Header: FC = memo(() => {
  return (
    <header className={styles.header}>
      <Container>
        <div>
          <Logo />
        </div>
      </Container>
    </header>
  );
});
