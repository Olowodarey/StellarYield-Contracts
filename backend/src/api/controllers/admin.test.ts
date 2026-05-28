import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../db/index.js", () => ({ query: vi.fn() }));

async function getTestContext() {
  const { query } = await import("../../db/index.js");
  const { getAdminStats } = await import("./admin.js");
  return { query: query as ReturnType<typeof vi.fn>, getAdminStats };
}

describe("Admin Controller", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getAdminStats", () => {
    it("returns total user count", async () => {
      const { query, getAdminStats } = await getTestContext();
      query.mockResolvedValue([{ count: "42" }]);

      const req = {} as any;
      const res = { json: vi.fn() } as any;
      const next = vi.fn();

      await getAdminStats(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ totalUsers: 42 });
    });

    it("returns 0 when no users", async () => {
      const { query, getAdminStats } = await getTestContext();
      query.mockResolvedValue([{ count: "0" }]);

      const req = {} as any;
      const res = { json: vi.fn() } as any;
      const next = vi.fn();

      await getAdminStats(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ totalUsers: 0 });
    });
  });
});
