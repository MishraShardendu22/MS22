interface StructuredDataProps {
  data: object | object[];
}

export function StructuredData({ data }: StructuredDataProps) {
  const jsonLd = (Array.isArray(data) ? data : [data]) as Record<
    string,
    unknown
  >[];

  return (
    <>
      {jsonLd.map((item) => {
        const key =
          (item["@type"] as string) ||
          (item["@id"] as string) ||
          JSON.stringify(item).slice(0, 50);
        return (
          <script
            key={key}
            type="application/ld+json"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data requires dangerouslySetInnerHTML - content is safe static data
            dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
          />
        );
      })}
    </>
  );
}
