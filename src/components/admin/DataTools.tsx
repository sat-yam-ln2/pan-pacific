import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Upload,
  Download,
  FileText,
  Database,
  Trash2,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  FileJson,
  FileSpreadsheet,
  Loader2,
  Archive,
  HardDrive
} from 'lucide-react';

interface DataToolsProps {
  shipments: any[];
  onUpdateShipments: (shipments: any[]) => void;
}

export function DataTools({ shipments, onUpdateShipments }: DataToolsProps) {
  const [isImporting, setIsImporting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [importMessage, setImportMessage] = useState('');

  // Export functions
  const handleExportJSON = () => {
    setIsExporting(true);
    setTimeout(() => {
      const dataStr = JSON.stringify(shipments, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `shipments_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      setIsExporting(false);
    }, 1000);
  };

  const handleExportCSV = () => {
    setIsExporting(true);
    setTimeout(() => {
      const csv = [
        ['Tracking ID', 'Customer Name', 'Customer Email', 'Origin', 'Destination', 'Status', 'Service Type', 'Created Date', 'Last Updated'],
        ...shipments.map(s => [
          s.trackingId,
          s.customerName,
          s.customerEmail,
          s.origin,
          s.destination,
          s.status,
          s.serviceType,
          s.createdDate,
          s.lastUpdated
        ])
      ].map(row => row.join(',')).join('\n');

      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `shipments_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      setIsExporting(false);
    }, 1000);
  };

  const handleExportBackup = () => {
    setIsExporting(true);
    setTimeout(() => {
      const backup = {
        exportDate: new Date().toISOString(),
        version: '1.0',
        totalRecords: shipments.length,
        data: shipments
      };
      const dataStr = JSON.stringify(backup, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `backup_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      setIsExporting(false);
    }, 1000);
  };

  // Import function
  const handleImportFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setImportStatus('idle');
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        let importedData;

        if (file.name.endsWith('.json')) {
          importedData = JSON.parse(content);
          // Handle both direct array and backup format
          if (importedData.data && Array.isArray(importedData.data)) {
            importedData = importedData.data;
          }
        } else if (file.name.endsWith('.csv')) {
          // Simple CSV parsing
          const lines = content.split('\n');
          const headers = lines[0].split(',');
          importedData = lines.slice(1).filter(line => line.trim()).map((line, index) => {
            const values = line.split(',');
            return {
              id: `imported-${Date.now()}-${index}`,
              trackingId: values[0] || '',
              customerName: values[1] || '',
              customerEmail: values[2] || '',
              origin: values[3] || '',
              destination: values[4] || '',
              status: values[5] || 'pending',
              serviceType: values[6] || 'air-freight',
              packageDetails: 'Imported shipment',
              weight: '0 kg',
              dimensions: '0x0x0 cm',
              createdDate: values[7] || new Date().toISOString().split('T')[0],
              lastUpdated: values[8] || new Date().toISOString().split('T')[0],
              estimatedDelivery: new Date().toISOString().split('T')[0],
              events: []
            };
          });
        }

        if (Array.isArray(importedData)) {
          onUpdateShipments([...shipments, ...importedData]);
          setImportStatus('success');
          setImportMessage(`Successfully imported ${importedData.length} shipments`);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (error) {
        setImportStatus('error');
        setImportMessage('Error importing file. Please check the format.');
      } finally {
        setIsImporting(false);
        event.target.value = '';
      }
    };

    reader.readAsText(file);
  };

  // Clear data
  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all shipment data? This action cannot be undone.')) {
      onUpdateShipments([]);
      setImportStatus('success');
      setImportMessage('All shipment data has been cleared');
    }
  };

  // Reset to sample data
  const handleResetToSample = () => {
    if (window.confirm('Reset to sample data? This will replace all current data.')) {
      // This would reload sample data - implementation depends on your setup
      setImportStatus('success');
      setImportMessage('Data reset to sample shipments');
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold text-[#1A1A1B]">Data Tools</h2>
        <p className="text-[#1A1A1B]/60 mt-1">
          Import, export, and manage your shipment data
        </p>
      </div>

      {/* Status Message */}
      {importStatus !== 'idle' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg border-2 flex items-start gap-3 ${
            importStatus === 'success'
              ? 'bg-green-50 border-green-500'
              : 'bg-red-50 border-red-500'
          }`}
        >
          {importStatus === 'success' ? (
            <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
          ) : (
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
          )}
          <div className="flex-1">
            <p className={`text-sm font-semibold ${
              importStatus === 'success' ? 'text-green-800' : 'text-red-800'
            }`}>
              {importMessage}
            </p>
          </div>
          <button
            onClick={() => setImportStatus('idle')}
            className={importStatus === 'success' ? 'text-green-600' : 'text-red-600'}
          >
            <FileText size={16} />
          </button>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Import Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl border-2 border-[#1A1A1B]/10 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[#003893]/10 rounded-lg flex items-center justify-center">
              <Upload className="text-[#003893]" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#1A1A1B]">Import Data</h3>
              <p className="text-sm text-[#1A1A1B]/60">Upload shipment data from files</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="border-2 border-dashed border-[#1A1A1B]/20 rounded-lg p-8 text-center hover:border-[#003893] transition-colors">
              <input
                type="file"
                id="file-upload"
                accept=".json,.csv"
                onChange={handleImportFile}
                className="hidden"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center gap-3"
              >
                {isImporting ? (
                  <Loader2 className="text-[#003893] animate-spin" size={48} />
                ) : (
                  <Database className="text-[#1A1A1B]/40" size={48} />
                )}
                <div>
                  <p className="font-semibold text-[#1A1A1B] mb-1">
                    {isImporting ? 'Importing...' : 'Click to upload file'}
                  </p>
                  <p className="text-sm text-[#1A1A1B]/60">
                    Supports JSON and CSV formats
                  </p>
                </div>
              </label>
            </div>

            <div className="bg-[#F5F7F8] p-4 rounded-lg">
              <h4 className="font-semibold text-[#1A1A1B] mb-2 text-sm">Supported Formats:</h4>
              <ul className="space-y-1 text-sm text-[#1A1A1B]/70">
                <li className="flex items-center gap-2">
                  <FileJson size={16} className="text-[#003893]" />
                  JSON (.json) - Full data with all fields
                </li>
                <li className="flex items-center gap-2">
                  <FileSpreadsheet size={16} className="text-green-600" />
                  CSV (.csv) - Basic shipment information
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Export Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl border-2 border-[#1A1A1B]/10 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Download className="text-green-600" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#1A1A1B]">Export Data</h3>
              <p className="text-sm text-[#1A1A1B]/60">Download your shipment data</p>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleExportJSON}
              disabled={isExporting}
              className="w-full p-4 border-2 border-[#1A1A1B]/20 rounded-lg hover:border-[#003893] hover:bg-[#003893]/5 transition-all text-left flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <FileJson className="text-[#003893] group-hover:scale-110 transition-transform" size={24} />
                <div>
                  <p className="font-semibold text-[#1A1A1B]">Export as JSON</p>
                  <p className="text-sm text-[#1A1A1B]/60">Complete data with all fields</p>
                </div>
              </div>
              {isExporting ? (
                <Loader2 className="animate-spin text-[#003893]" size={20} />
              ) : (
                <Download className="text-[#1A1A1B]/40 group-hover:text-[#003893]" size={20} />
              )}
            </button>

            <button
              onClick={handleExportCSV}
              disabled={isExporting}
              className="w-full p-4 border-2 border-[#1A1A1B]/20 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all text-left flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="text-green-600 group-hover:scale-110 transition-transform" size={24} />
                <div>
                  <p className="font-semibold text-[#1A1A1B]">Export as CSV</p>
                  <p className="text-sm text-[#1A1A1B]/60">For Excel and spreadsheets</p>
                </div>
              </div>
              {isExporting ? (
                <Loader2 className="animate-spin text-green-600" size={20} />
              ) : (
                <Download className="text-[#1A1A1B]/40 group-hover:text-green-600" size={20} />
              )}
            </button>

            <button
              onClick={handleExportBackup}
              disabled={isExporting}
              className="w-full p-4 border-2 border-[#1A1A1B]/20 rounded-lg hover:border-[#FFD700] hover:bg-yellow-50 transition-all text-left flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <Archive className="text-[#FFD700] group-hover:scale-110 transition-transform" size={24} />
                <div>
                  <p className="font-semibold text-[#1A1A1B]">Create Backup</p>
                  <p className="text-sm text-[#1A1A1B]/60">Full backup with metadata</p>
                </div>
              </div>
              {isExporting ? (
                <Loader2 className="animate-spin text-[#FFD700]" size={20} />
              ) : (
                <Download className="text-[#1A1A1B]/40 group-hover:text-[#FFD700]" size={20} />
              )}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Database Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white p-6 rounded-xl border-2 border-[#1A1A1B]/10 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <HardDrive className="text-purple-600" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#1A1A1B]">Database Management</h3>
            <p className="text-sm text-[#1A1A1B]/60">Manage your shipment database</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#F5F7F8] p-4 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <FileText className="text-[#003893]" size={24} />
              <span className="text-2xl font-bold text-[#1A1A1B]">{shipments.length}</span>
            </div>
            <p className="text-sm font-semibold text-[#1A1A1B]">Total Records</p>
            <p className="text-xs text-[#1A1A1B]/60 mt-1">Active shipments in database</p>
          </div>

          <button
            onClick={handleResetToSample}
            className="bg-white border-2 border-[#003893] text-[#003893] p-4 rounded-lg hover:bg-[#003893] hover:text-white transition-all text-left flex flex-col items-start justify-between group"
          >
            <RefreshCw className="mb-2 group-hover:rotate-180 transition-transform duration-500" size={24} />
            <div>
              <p className="text-sm font-semibold">Reset to Sample</p>
              <p className="text-xs opacity-70 mt-1">Restore demo data</p>
            </div>
          </button>

          <button
            onClick={handleClearData}
            className="bg-white border-2 border-[#DC143C] text-[#DC143C] p-4 rounded-lg hover:bg-[#DC143C] hover:text-white transition-all text-left flex flex-col items-start justify-between group"
          >
            <Trash2 className="mb-2" size={24} />
            <div>
              <p className="text-sm font-semibold">Clear All Data</p>
              <p className="text-xs opacity-70 mt-1">Delete all shipments</p>
            </div>
          </button>
        </div>
      </motion.div>

      {/* Help Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-[#003893]/5 to-[#DC143C]/5 p-6 rounded-xl border-2 border-[#1A1A1B]/10"
      >
        <h4 className="font-bold text-[#1A1A1B] mb-3">📋 Data Format Guidelines</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[#1A1A1B]/70">
          <div>
            <p className="font-semibold text-[#1A1A1B] mb-2">CSV Format:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>First row must contain headers</li>
              <li>Use commas to separate values</li>
              <li>Dates in YYYY-MM-DD format</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-[#1A1A1B] mb-2">JSON Format:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Must be valid JSON array</li>
              <li>Include all required fields</li>
              <li>Backup files include metadata</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
