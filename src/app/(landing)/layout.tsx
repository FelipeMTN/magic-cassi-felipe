import { Column, Mask, MatrixFx } from "@once-ui-system/core";
import { Header, Footer, Banner } from "@/app/(landing)/components";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Banner zIndex={10} />
      <Header />
      <Column style={{maxHeight: "100dvh"}} fillWidth aspectRatio="1" horizontal="center" position="absolute" top="0" left="0">
        <Mask maxWidth="m" x={50} y={0} radius={50}>
          <MatrixFx
            size={1.5}
            spacing={5}
            fps={24}
            colors={["brand-solid-strong"]}
            flicker
          />
        </Mask>
      </Column>
      <Column fillWidth horizontal="center" flex={1} paddingY="xl">
        {children}
      </Column>
      <Footer />
    </>
  );
}
