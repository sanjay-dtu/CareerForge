"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Edit2, Save, X, Sparkles, Loader2 } from "lucide-react";
import { improveWithAI } from "@/actions/resume";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export function EntryForm({ type, entries = [], onChange }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isImproving, setIsImproving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    organization: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImproveDescription = async () => {
    if (!formData.description) {
      toast.error("Please enter a description first");
      return;
    }

    setIsImproving(true);
    try {
      const improved = await improveWithAI({
        current: formData.description,
        type: type.toLowerCase(),
      });
      if (improved) {
        handleInputChange("description", improved);
        toast.success("Description enhanced successfully!");
      }
    } catch (error) {
      toast.error(error.message || "Failed to improve description");
    } finally {
      setIsImproving(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      organization: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    });
    setEditingIndex(null);
    setIsAdding(false);
  };

  const handleAdd = () => {
    if (!formData.title.trim()) return;
    const newEntry = { id: Date.now().toString(), ...formData };
    onChange([...(entries || []), newEntry]);
    resetForm();
  };

  const handleEdit = (index) => {
    const entry = entries[index];
    setFormData({
      title: entry.title || "",
      organization: entry.organization || "",
      location: entry.location || "",
      startDate: entry.startDate || "",
      endDate: entry.endDate || "",
      description: entry.description || "",
    });
    setEditingIndex(index);
    setIsAdding(false);
  };

  const handleUpdate = () => {
    if (!formData.title.trim()) return;
    const updatedEntries = [...(entries || [])];
    updatedEntries[editingIndex] = { ...updatedEntries[editingIndex], ...formData };
    onChange(updatedEntries);
    resetForm();
  };

  const handleDelete = (index) => {
    const updatedEntries = (entries || []).filter((_, i) => i !== index);
    onChange(updatedEntries);
  };

  const getFieldLabel = (field) => {
    const labels = {
      Experience: { title: "Job Title", organization: "Company", location: "Location" },
      Education: { title: "Degree", organization: "Institution", location: "Location" },
      Project: { title: "Project Name", organization: "Organization/Client", location: "Location" },
    };
    return labels[type]?.[field] || field;
  };

  return (
    <div className="space-y-4">
      {/* Existing Entries */}
      <AnimatePresence>
        {entries && entries.length > 0 && (
          <div className="space-y-3">
            {entries.map((entry, index) => (
              <motion.div 
                key={entry.id || index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                className="glass-card rounded-xl p-4 border border-white/10 group hover:border-white/20 transition-all"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">{entry.title}</h4>
                    {entry.organization && (
                      <p className="text-sm text-white/60 mt-1">
                        {entry.organization}
                        {entry.location && ` • ${entry.location}`}
                      </p>
                    )}
                    {(entry.startDate || entry.endDate) && (
                      <p className="text-sm text-white/40 mt-1 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/50"></div>
                        {entry.startDate} {entry.endDate && `- ${entry.endDate}`}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button type="button" variant="ghost" size="sm" onClick={() => handleEdit(index)} className="hover:bg-white/10 text-white/70 hover:text-white">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="sm" onClick={() => handleDelete(index)} className="hover:bg-red-500/20 text-red-400 hover:text-red-300">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {entry.description && (
                  <div className="mt-3 pt-3 border-t border-white/5">
                    <p className="text-sm text-white/70 whitespace-pre-line leading-relaxed">{entry.description}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Add/Edit Form */}
      <AnimatePresence>
        {(isAdding || editingIndex !== null) && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="glass-card rounded-xl p-5 border border-cyan-500/30 relative">
              <div className="absolute inset-0 bg-cyan-500/5 rounded-xl"></div>
              
              <div className="relative z-10 space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">
                  {editingIndex !== null ? `Edit ${type}` : `Add ${type}`}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/60 uppercase tracking-wider">{getFieldLabel("title")} *</label>
                    <Input
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder={`Enter ${getFieldLabel("title").toLowerCase()}`}
                      className="bg-white/5 border-white/10 text-white focus:border-cyan-500/50 transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/60 uppercase tracking-wider">{getFieldLabel("organization")}</label>
                    <Input
                      value={formData.organization}
                      onChange={(e) => handleInputChange("organization", e.target.value)}
                      placeholder={`Enter ${getFieldLabel("organization").toLowerCase()}`}
                      className="bg-white/5 border-white/10 text-white focus:border-cyan-500/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/60 uppercase tracking-wider">Location</label>
                    <Input
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder="Enter location"
                      className="bg-white/5 border-white/10 text-white focus:border-cyan-500/50 transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/60 uppercase tracking-wider">Start Date</label>
                    <Input
                      value={formData.startDate}
                      onChange={(e) => handleInputChange("startDate", e.target.value)}
                      placeholder="e.g., Jan 2020"
                      className="bg-white/5 border-white/10 text-white focus:border-cyan-500/50 transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/60 uppercase tracking-wider">End Date</label>
                    <Input
                      value={formData.endDate}
                      onChange={(e) => handleInputChange("endDate", e.target.value)}
                      placeholder="e.g., Present"
                      className="bg-white/5 border-white/10 text-white focus:border-cyan-500/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-medium text-white/60 uppercase tracking-wider">Description</label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleImproveDescription}
                      disabled={isImproving || !formData.description}
                      className="h-8 text-xs bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-300 border border-cyan-500/20"
                    >
                      {isImproving ? (
                        <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                      ) : (
                        <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                      )}
                      Enhance with AI
                    </Button>
                  </div>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe your responsibilities, achievements, or key points..."
                    className="h-32 bg-white/5 border-white/10 text-white focus:border-cyan-500/50 transition-colors resize-none"
                  />
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <Button type="button" variant="outline" onClick={resetForm} className="border-white/10 hover:bg-white/5 text-white">
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button type="button" onClick={editingIndex !== null ? handleUpdate : handleAdd} disabled={!formData.title.trim()} className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold">
                    <Save className="h-4 w-4 mr-2" />
                    {editingIndex !== null ? "Update" : "Add"}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add New Button */}
      {!isAdding && editingIndex === null && (
        <Button
          type="button"
          variant="outline"
          className="w-full py-6 border-dashed border-2 border-white/20 hover:border-cyan-500/50 hover:bg-cyan-500/5 text-white/60 hover:text-cyan-400 transition-all rounded-xl"
          onClick={() => setIsAdding(true)}
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New {type}
        </Button>
      )}
    </div>
  );
}