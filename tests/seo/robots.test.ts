import { describe, expect, it } from "vitest";
import { BaseURL } from "@/static/data";

function hasDoubleSlash(url: string): boolean {
  const stripped = url.replace(/^https?:\/\//, "");
  return stripped.includes("//");
}

describe("robots.txt generation", () => {
  it("includes valid rules and normalized URLs", async () => {
    const { default: robots } = await import("@/app/robots");
    const result = robots();

    const rules = Array.isArray(result.rules)
      ? result.rules
      : result.rules
        ? [result.rules]
        : [];
    expect(rules.length).toBeGreaterThan(0);

    for (const rule of rules) {
      const userAgents = Array.isArray(rule.userAgent)
        ? rule.userAgent
        : rule.userAgent
          ? [rule.userAgent]
          : [];
      expect(userAgents.length).toBeGreaterThan(0);
      userAgents.forEach((agent) => {
        expect(typeof agent).toBe("string");
        expect(agent.length).toBeGreaterThan(0);
      });

      if (rule.allow) {
        const allowList = Array.isArray(rule.allow) ? rule.allow : [rule.allow];
        allowList.forEach((allow) => {
          expect(typeof allow).toBe("string");
        });
      }
      if (rule.disallow) {
        const disallowList = Array.isArray(rule.disallow)
          ? rule.disallow
          : [rule.disallow];
        disallowList.forEach((disallow) => {
          expect(typeof disallow).toBe("string");
        });
      }
    }

    const defaultRule = rules.find((rule) => {
      if (Array.isArray(rule.userAgent)) {
        return rule.userAgent.includes("*");
      }
      return rule.userAgent === "*";
    });
    expect(defaultRule?.allow).toBe("/");
    if (defaultRule?.disallow) {
      const disallowList = Array.isArray(defaultRule.disallow)
        ? defaultRule.disallow
        : [defaultRule.disallow];
      expect(disallowList).toContain("/api/");
      expect(disallowList).toContain("/private/");
    }

    expect(result.host).toBe(BaseURL);
    const sitemap = Array.isArray(result.sitemap)
      ? result.sitemap[0]
      : result.sitemap;
    expect(sitemap).toBe(`${BaseURL}/sitemap.xml`);
    if (sitemap) {
      expect(hasDoubleSlash(sitemap)).toBe(false);
    }
  });
});
