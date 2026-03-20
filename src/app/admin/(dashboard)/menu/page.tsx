"use client";

import { useState, useEffect, useCallback } from "react";
import type { DbMenuItem } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  UtensilsCrossed,
} from "lucide-react";
import { toast } from "sonner";

interface MenuCategory {
  category: string;
  items: DbMenuItem[];
}

const defaultForm = {
  name: "",
  description: "",
  price: "",
  category: "",
  is_veg: true,
  sort_order: "0",
};

export default function AdminMenuPage() {
  const [items, setItems] = useState<DbMenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<DbMenuItem | null>(null);
  const [form, setForm] = useState(defaultForm);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // ─── Fetch all menu items ────────────────────────────────
  const fetchItems = useCallback(async () => {
    const res = await fetch("/api/admin/menu");
    if (res.ok) {
      const data = await res.json();
      setItems(data as DbMenuItem[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // ─── Group by category ───────────────────────────────────
  const grouped: MenuCategory[] = items.reduce<MenuCategory[]>((acc, item) => {
    const existing = acc.find((g) => g.category === item.category);
    if (existing) {
      existing.items.push(item);
    } else {
      acc.push({ category: item.category, items: [item] });
    }
    return acc;
  }, []);

  // ─── Get unique categories for the dropdown ──────────────
  const categories = [...new Set(items.map((i) => i.category))];

  // ─── Open dialog for add/edit ────────────────────────────
  function openAdd() {
    setEditingItem(null);
    setForm(defaultForm);
    setDialogOpen(true);
  }

  function openEdit(item: DbMenuItem) {
    setEditingItem(item);
    setForm({
      name: item.name,
      description: item.description || "",
      price: String(item.price),
      category: item.category,
      is_veg: item.is_veg,
      sort_order: String(item.sort_order),
    });
    setDialogOpen(true);
  }

  // ─── Save (add or edit) ──────────────────────────────────
  async function handleSave() {
    if (!form.name.trim() || !form.price || !form.category.trim()) {
      toast.error("Name, price, and category are required");
      return;
    }

    setSaving(true);
    const body = {
      ...(editingItem ? { id: editingItem.id } : {}),
      name: form.name.trim(),
      description: form.description.trim() || null,
      price: parseInt(form.price, 10),
      category: form.category.trim(),
      is_veg: form.is_veg,
      sort_order: parseInt(form.sort_order, 10) || 0,
    };

    const res = await fetch("/api/admin/menu", {
      method: editingItem ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      toast.success(editingItem ? "Item updated" : "Item added");
      setDialogOpen(false);
      fetchItems();
    } else {
      const err = await res.json();
      toast.error(err.error || "Something went wrong");
    }
    setSaving(false);
  }

  // ─── Toggle availability ─────────────────────────────────
  async function toggleAvailability(item: DbMenuItem) {
    // Optimistic update
    setItems((prev) =>
      prev.map((i) =>
        i.id === item.id ? { ...i, is_available: !i.is_available } : i
      )
    );

    const res = await fetch("/api/admin/menu", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id, is_available: !item.is_available }),
    });

    if (!res.ok) {
      // Revert on failure
      setItems((prev) =>
        prev.map((i) =>
          i.id === item.id ? { ...i, is_available: item.is_available } : i
        )
      );
      toast.error("Failed to update availability");
    }
  }

  // ─── Delete item ─────────────────────────────────────────
  async function handleDelete(id: string) {
    setDeletingId(id);
    const res = await fetch("/api/admin/menu", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      toast.success("Item deleted");
      setItems((prev) => prev.filter((i) => i.id !== id));
    } else {
      toast.error("Failed to delete item");
    }
    setDeletingId(null);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-brew-green" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-xl text-brew-text">Menu Items</h1>
          <p className="text-xs text-brew-text-muted mt-0.5">
            {items.length} items across {categories.length} categories
          </p>
        </div>
        <Button
          className="bg-brew-green hover:bg-brew-green-dark text-white rounded-lg"
          onClick={openAdd}
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Add Item
        </Button>
      </div>

      {/* Items grouped by category */}
      {grouped.length === 0 ? (
        <div className="text-center py-16">
          <UtensilsCrossed className="w-12 h-12 text-brew-text-muted/30 mx-auto mb-3" />
          <p className="text-brew-text-muted text-sm">No menu items yet</p>
        </div>
      ) : (
        grouped.map((group) => (
          <section key={group.category}>
            <h2 className="font-heading text-sm text-brew-text-muted uppercase tracking-wide mb-2">
              {group.category}
            </h2>
            <div className="bg-white rounded-2xl border border-brew-border/50 divide-y divide-brew-border/30">
              {group.items.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 flex items-center gap-3 ${
                    !item.is_available ? "opacity-50" : ""
                  }`}
                >
                  {/* Veg/Non-veg badge */}
                  <span
                    className={`inline-flex items-center justify-center w-4 h-4 rounded-sm border shrink-0 ${
                      item.is_veg ? "border-green-600" : "border-red-600"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        item.is_veg ? "bg-green-600" : "bg-red-600"
                      }`}
                    />
                  </span>

                  {/* Name + price */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-brew-text truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-brew-text-muted">₹{item.price}</p>
                  </div>

                  {/* Availability toggle */}
                  <Switch
                    checked={item.is_available}
                    onCheckedChange={() => toggleAvailability(item)}
                    size="sm"
                  />

                  {/* Edit */}
                  <button
                    onClick={() => openEdit(item)}
                    className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-brew-cream transition-colors text-brew-text-muted"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>

                  {/* Delete */}
                  <Dialog>
                    <DialogTrigger
                      render={
                        <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-red-50 transition-colors text-red-500" />
                      }
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogTitle>Delete Item</DialogTitle>
                      <p className="text-sm text-brew-text-muted">
                        Are you sure you want to delete &quot;{item.name}&quot;?
                        This cannot be undone.
                      </p>
                      <div className="flex gap-2 justify-end mt-4">
                        <DialogClose
                          render={
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-lg"
                            />
                          }
                        >
                          Cancel
                        </DialogClose>
                        <DialogClose
                          render={
                            <Button
                              size="sm"
                              className="bg-red-600 hover:bg-red-700 text-white rounded-lg"
                              onClick={() => handleDelete(item.id)}
                            />
                          }
                        >
                          {deletingId === item.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            "Delete"
                          )}
                        </DialogClose>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              ))}
            </div>
          </section>
        ))
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle>
            {editingItem ? "Edit Menu Item" : "Add Menu Item"}
          </DialogTitle>

          <div className="space-y-4 mt-2">
            <div>
              <label className="text-xs font-medium text-brew-text-muted mb-1 block">
                Name *
              </label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Classic Smash Burger"
                className="rounded-lg border-brew-border"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-brew-text-muted mb-1 block">
                Description
              </label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Short description (optional)"
                className="rounded-lg border-brew-border resize-none"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-brew-text-muted mb-1 block">
                  Price (₹) *
                </label>
                <Input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="149"
                  className="rounded-lg border-brew-border"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-brew-text-muted mb-1 block">
                  Sort Order
                </label>
                <Input
                  type="number"
                  value={form.sort_order}
                  onChange={(e) =>
                    setForm({ ...form, sort_order: e.target.value })
                  }
                  placeholder="0"
                  className="rounded-lg border-brew-border"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-brew-text-muted mb-1 block">
                Category *
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setForm({ ...form, category: cat })}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      form.category === cat
                        ? "bg-brew-green text-white"
                        : "bg-brew-cream text-brew-text-muted hover:bg-brew-border"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <Input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="Or type a new category"
                className="rounded-lg border-brew-border text-sm"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-brew-text-muted">
                Vegetarian
              </label>
              <Switch
                checked={form.is_veg}
                onCheckedChange={(checked) =>
                  setForm({ ...form, is_veg: checked })
                }
              />
            </div>

            <Separator />

            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                className="bg-brew-green hover:bg-brew-green-dark text-white rounded-lg"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-1" />
                ) : null}
                {editingItem ? "Save Changes" : "Add Item"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
