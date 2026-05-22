import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { NAV_ITEMS } from "@/static/navigation";

const appDir = path.join(process.cwd(), "src", "app");
const educationFile = path.join(
  process.cwd(),
  "src",
  "component",
  "Hero",
  "EducationSection.tsx",
);
const homePageFile = path.join(appDir, "page.tsx");

function routeExists(href: string): boolean {
  const cleanHref = href.replace(/[?#].*$/, "");
  if (!cleanHref || cleanHref === "/") {
    return fs.existsSync(path.join(appDir, "page.tsx"));
  }

  const routePath = cleanHref.replace(/^\//, "");
  const pagePath = path.join(appDir, routePath, "page.tsx");
  const routePathFile = path.join(appDir, routePath, "route.ts");
  return fs.existsSync(pagePath) || fs.existsSync(routePathFile);
}

function fileHasId(filePath: string, id: string): boolean {
  if (!fs.existsSync(filePath)) return false;
  const contents = fs.readFileSync(filePath, "utf8");
  const idPattern = new RegExp(`id=["']${id}["']`);
  return idPattern.test(contents);
}

function anchorExists(anchor: string): boolean {
  if (anchor === "education") {
    return fileHasId(educationFile, "education");
  }

  return fileHasId(homePageFile, anchor);
}

describe("navigation integrity", () => {
  it("includes the /contact navigation route", () => {
    const hasContact = NAV_ITEMS.some((item) => item.href === "/contact");
    expect(hasContact).toBe(true);
  });

  it("keeps navigation links stable", () => {
    expect(NAV_ITEMS).toMatchSnapshot();
  });

  it("education anchor link is valid", () => {
    expect(anchorExists("education")).toBe(true);
  });

  it("internal navigation routes exist and anchors resolve", () => {
    const internalItems = NAV_ITEMS.filter(
      (item) => item.href.startsWith("/") && !item.href.startsWith("//"),
    );

    for (const item of internalItems) {
      const [pathPart, hash] = item.href.split("#");
      expect(routeExists(pathPart || "/")).toBe(true);
      if (hash) {
        expect(anchorExists(hash)).toBe(true);
      }
    }
  });
});
