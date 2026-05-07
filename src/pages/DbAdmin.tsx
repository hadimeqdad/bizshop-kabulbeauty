import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Loader2, Plus, Pencil, Trash2, RefreshCw } from "lucide-react";

const TABLES = ["products", "user_roles"] as const;
type TableName = typeof TABLES[number];

async function callApi(body: Record<string, unknown>) {
  const { data, error } = await supabase.functions.invoke("db-admin", { body });
  if (error) throw error;
  if ((data as any)?.error) throw new Error((data as any).error);
  return data;
}

export default function DbAdmin() {
  const [table, setTable] = useState<TableName>("products");
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Record<string, any>>({});

  const load = async () => {
    setLoading(true);
    try {
      const data: any = await callApi({ action: "list", table });
      setRows(data.rows ?? []);
    } catch (e: any) {
      toast({ title: "خطا", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [table]);

  const columns = rows.length > 0 ? Object.keys(rows[0]) : [];

  const startEdit = (row: any) => {
    setEditing(row);
    setForm({ ...row });
  };

  const startCreate = () => {
    const empty: Record<string, any> = {};
    columns.forEach(c => { empty[c] = ""; });
    setForm(empty);
    setCreating(true);
  };

  const save = async () => {
    try {
      const payload = { ...form };
      // Remove empty/auto fields when creating
      if (creating) {
        ["id", "created_at", "updated_at"].forEach(k => {
          if (payload[k] === "" || payload[k] == null) delete payload[k];
        });
        await callApi({ action: "insert", table, payload });
        toast({ title: "ردیف اضافه شد" });
      } else {
        const { id, created_at, updated_at, ...rest } = payload;
        await callApi({ action: "update", table, id: editing.id, payload: rest });
        toast({ title: "ردیف ویرایش شد" });
      }
      setEditing(null);
      setCreating(false);
      load();
    } catch (e: any) {
      toast({ title: "خطا", description: e.message, variant: "destructive" });
    }
  };

  const remove = async (row: any) => {
    if (!confirm("حذف این ردیف؟")) return;
    try {
      await callApi({ action: "delete", table, id: row.id });
      toast({ title: "حذف شد" });
      load();
    } catch (e: any) {
      toast({ title: "خطا", description: e.message, variant: "destructive" });
    }
  };

  const dialogOpen = creating || !!editing;
  const closeDialog = () => { setCreating(false); setEditing(null); };

  return (
    <div className="container py-8" dir="rtl">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-2xl font-bold">پنل مدیریت دیتابیس</h1>
        <div className="flex gap-2">
          {TABLES.map(t => (
            <Button key={t} variant={table === t ? "default" : "outline"} size="sm" onClick={() => setTable(t)}>
              {t}
            </Button>
          ))}
          <Button size="sm" variant="outline" onClick={load}><RefreshCw className="w-4 h-4" /></Button>
          <Button size="sm" onClick={startCreate}><Plus className="w-4 h-4" /> افزودن</Button>
        </div>
      </div>

      <div className="text-sm text-muted-foreground mb-3">
        جدول: <b>{table}</b> — {rows.length} ردیف
      </div>

      <div className="border rounded-md overflow-auto max-w-full">
        {loading ? (
          <div className="p-8 grid place-items-center"><Loader2 className="animate-spin" /></div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map(c => <TableHead key={c}>{c}</TableHead>)}
                <TableHead>عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow key={row.id ?? i}>
                  {columns.map(c => (
                    <TableCell key={c} className="max-w-xs truncate text-xs">
                      {typeof row[c] === "object" ? JSON.stringify(row[c]) : String(row[c] ?? "")}
                    </TableCell>
                  ))}
                  <TableCell className="flex gap-1">
                    <Button size="icon" variant="ghost" onClick={() => startEdit(row)}><Pencil className="w-4 h-4" /></Button>
                    <Button size="icon" variant="ghost" onClick={() => remove(row)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={(o) => !o && closeDialog()}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>{creating ? "افزودن ردیف" : "ویرایش ردیف"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {Object.keys(form).map(key => {
              const val = form[key];
              const isLong = typeof val === "string" && val.length > 80;
              const disabled = !creating && (key === "id" || key === "created_at" || key === "updated_at");
              return (
                <div key={key}>
                  <label className="text-xs font-medium block mb-1">{key}</label>
                  {isLong ? (
                    <Textarea
                      value={val ?? ""}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      disabled={disabled}
                      rows={4}
                    />
                  ) : (
                    <Input
                      value={val ?? ""}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      disabled={disabled}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>انصراف</Button>
            <Button onClick={save}>ذخیره</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
