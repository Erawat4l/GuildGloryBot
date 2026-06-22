import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle, Youtube, Instagram, Settings, Activity, Users, Server, Clock, Database, Trash2, Search } from 'lucide-react';
import './index.css';

// --- Screens ---

const LoginScreen = ({ onLogin }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (userId === 'admin' && password === '090909') {
      onLogin('admin');
    } else if (userId && password) {
      // Simulate normal user login
      onLogin('user');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-4 fade-in">
      <div className="gaming-card w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Shield size={48} className="text-primary mb-4" />
          <h1 className="text-2xl font-bold text-center">GuildGloryBot</h1>
          <p className="text-text-secondary mt-2">Authentication System</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label className="input-label">User ID</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="Enter User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <input 
              type="password" 
              className="input-field" 
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-error mb-4 text-center text-sm">{error}</p>}

          <button type="submit" className="btn btn-primary w-full mt-2">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

const TaskVerificationScreen = ({ onComplete }) => {
  const [ytSubscribed, setYtSubscribed] = useState(false);
  const [igFollowed, setIgFollowed] = useState(false);

  const handleYt = () => {
    window.open('https://youtube.com/@erawat4l', '_blank');
    setTimeout(() => setYtSubscribed(true), 2000);
  };

  const handleIg = () => {
    window.open('https://www.instagram.com/erawat_69', '_blank');
    setTimeout(() => setIgFollowed(true), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-4 fade-in">
      <div className="gaming-card w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6">Task Verification</h2>
        <p className="text-text-secondary mb-8">Complete the mandatory tasks to proceed.</p>

        <div className="flex flex-col gap-4 mb-8">
          <button onClick={handleYt} className={`btn w-full flex justify-between items-center ${ytSubscribed ? 'btn-secondary opacity-50' : 'btn-secondary'}`} disabled={ytSubscribed}>
            <span className="flex items-center gap-2"><Youtube size={20}/> Subscribe YouTube</span>
            {ytSubscribed && <CheckCircle size={20} className="text-success" />}
          </button>

          <button onClick={handleIg} className={`btn w-full flex justify-between items-center ${igFollowed ? 'btn-secondary opacity-50' : 'btn-secondary'}`} disabled={igFollowed}>
            <span className="flex items-center gap-2"><Instagram size={20}/> Follow Instagram</span>
            {igFollowed && <CheckCircle size={20} className="text-success" />}
          </button>
        </div>

        {(ytSubscribed && igFollowed) && (
          <button onClick={onComplete} className="btn btn-primary w-full fade-in">
            Continue to App
          </button>
        )}
      </div>
    </div>
  );
};

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return p + Math.floor(Math.random() * 15) + 5;
      });
    }, 300);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-4 fade-in">
      <div className="w-full max-w-md text-center">
        <h2 className="text-xl font-bold mb-2">Guild Glory Bot Patching...</h2>
        <p className="text-text-secondary mb-8">Processing...</p>
        
        <div className="w-full bg-slate-800 rounded-full h-4 mb-4 border border-slate-700 overflow-hidden">
          <div className="bg-primary-color h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="font-mono text-primary">{Math.min(progress, 100)}%</p>
      </div>
    </div>
  );
};

const DashboardScreen = ({ onConnect, goHistory, isAdmin, goAdmin }) => {
  const [uid, setUid] = useState('');
  const [gloryPoint, setGloryPoint] = useState('');
  const [server, setServer] = useState('India');
  const [error, setError] = useState('');
  
  const [livePlayers] = useState(Math.floor(Math.random() * 201) + 800);
  const [botConnected] = useState(Math.floor(Math.random() * 51) + 100);
  const [guildActive] = useState(Math.floor(Math.random() * 21) + 90);

  const handleConnect = () => {
    if (!uid || uid.length !== 10 || !/^\d+$/.test(uid)) {
      setError('Guild UID must be exactly 10 digits.');
      return;
    }
    if (!gloryPoint || parseInt(gloryPoint) > 30000 || parseInt(gloryPoint) < 1) {
      setError('Guild Glory Point must be between 1 and 30,000.');
      return;
    }
    setError('');
    onConnect({ uid, gloryPoint, server });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 fade-in pb-20">
      <div className="flex justify-between items-center mb-8 bg-slate-800 p-4 rounded-xl border border-slate-700">
        <div>
          <h1 className="text-2xl font-bold text-primary">Guild Glory Bot System</h1>
          <p className="text-sm text-text-secondary">Owner: SpeactarLive</p>
        </div>
        <div className="flex gap-2">
          {isAdmin && (
            <button onClick={goAdmin} className="btn bg-purple-600 hover:bg-purple-700 p-2 rounded-lg">
              <Database size={20} />
            </button>
          )}
          <button onClick={goHistory} className="btn bg-slate-700 hover:bg-slate-600 p-2 rounded-lg">
            <Clock size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="gaming-card flex items-center justify-between">
          <div>
            <p className="text-text-secondary text-sm uppercase tracking-wider">Server Status</p>
            <p className="text-xl font-bold text-success flex items-center gap-2 mt-1">
              <span className="w-3 h-3 rounded-full bg-success animate-pulse"></span> ONLINE
            </p>
          </div>
          <Server size={32} className="text-slate-600" />
        </div>
        <div className="gaming-card flex items-center justify-between">
          <div>
            <p className="text-text-secondary text-sm uppercase tracking-wider">Live Active Players</p>
            <p className="text-2xl font-bold mt-1">{livePlayers}</p>
          </div>
          <Users size={32} className="text-slate-600" />
        </div>
      </div>

      <div className="gaming-card mb-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Settings size={20} className="text-primary"/> Bot Configuration
        </h3>
        <div className="mb-4">
          <label className="text-sm text-text-secondary block mb-1">Inter Bot Access Token</label>
          <code className="block w-full p-2 bg-slate-900 rounded border border-slate-700 text-xs break-all text-slate-300">
            code=b1511bf116e1d58fcea79c41ca8a4b26292c04d15a16e9ea373eb69255e8ee36
          </code>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm border-t border-slate-700 pt-4 mt-4">
          <div>
            <span className="text-text-secondary block">Access Token Status:</span>
            <span className="text-success font-bold">Active</span>
          </div>
          <div>
            <span className="text-text-secondary block">Source File Status:</span>
            <span className="text-success font-bold">Loaded</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-800 p-4 rounded-lg text-center border border-slate-700">
          <p className="text-xs text-text-secondary uppercase">Total Guild Bot</p>
          <p className="text-xl font-bold text-primary mt-1">310</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg text-center border border-slate-700">
          <p className="text-xs text-text-secondary uppercase">Bot Connected</p>
          <p className="text-xl font-bold text-warning mt-1">{botConnected}</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg text-center border border-slate-700">
          <p className="text-xs text-text-secondary uppercase">Guild Active</p>
          <p className="text-xl font-bold text-success mt-1">{guildActive}</p>
        </div>
      </div>

      <div className="gaming-card mb-8">
        <h3 className="text-lg font-bold mb-6">Connect Bot Setup</h3>
        
        <div className="input-group">
          <label className="input-label">Guild UID</label>
          <input 
            type="text" 
            className="input-field font-mono" 
            placeholder="10 digit Guild UID"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            maxLength={10}
          />
        </div>

        <div className="input-group">
          <label className="input-label">Guild Glory Point</label>
          <input 
            type="number" 
            className="input-field font-mono" 
            placeholder="Max 30000"
            value={gloryPoint}
            onChange={(e) => setGloryPoint(e.target.value)}
            max={30000}
          />
        </div>

        <div className="input-group mb-6">
          <label className="input-label">Game Server</label>
          <select 
            className="input-field"
            value={server}
            onChange={(e) => setServer(e.target.value)}
          >
            <option>India</option>
            <option>Pakistan</option>
            <option>Bangladesh</option>
            <option>Nepal</option>
            <option>Canada</option>
            <option>Brazil</option>
            <option>Singapore</option>
          </select>
        </div>

        {error && <p className="text-error mb-4 text-sm font-medium p-2 bg-red-900/20 rounded">{error}</p>}

        <button onClick={handleConnect} className="btn btn-primary w-full text-lg py-4">
          Connect Guild Bot
        </button>
      </div>
    </div>
  );
};

const ProcessingScreen = ({ onFinish }) => {
  const [step, setStep] = useState(0);
  const [availBots, setAvailBots] = useState(null);
  
  const messages = [
    { text: "Initializing...", color: "text-slate-300" },
    { text: "Connecting...", color: "text-warning" },
    { text: "Checking Guild...", color: "text-primary" },
    { text: "Verifying Data...", color: "text-primary" },
    { text: "Preparing Bot...", color: "text-warning" },
    { text: "Sending Request...", color: "text-success" },
    { text: "Processing...", color: "text-success" }
  ];

  useEffect(() => {
    // Initial check available bots
    setTimeout(() => {
      setAvailBots(Math.floor(Math.random() * 5) + 1);
    }, 2000);

    // After bots found, proceed with steps
    let currentStep = 0;
    const interval = setInterval(() => {
      if (availBots !== null) {
        if (currentStep < messages.length) {
          setStep(currentStep);
          currentStep++;
        } else {
          clearInterval(interval);
          const isSuccess = Math.random() < 0.70;
          setTimeout(() => onFinish(isSuccess), 2000);
        }
      }
    }, 4000); // about 30-40 seconds total
    
    return () => clearInterval(interval);
  }, [availBots, onFinish]);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-4 fade-in bg-slate-900">
      <div className="text-center w-full max-w-md">
        <Activity size={64} className="text-primary mx-auto mb-8 animate-pulse" />
        
        {availBots === null ? (
          <div>
            <h2 className="text-xl font-bold mb-4 animate-pulse">Checking Available Bots...</h2>
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : (
          <div className="fade-in">
            <h2 className="text-xl font-bold mb-2">Guild Glory Bot Available: {availBots}</h2>
            <div className="gaming-card mt-8 p-6 bg-black/40 text-left min-h-[200px] border-slate-700 font-mono text-sm">
              {messages.slice(0, step + 1).map((m, i) => (
                <p key={i} className={`${m.color} mb-2 fade-in`}>&gt; {m.text}</p>
              ))}
              {step < messages.length && (
                <span className="inline-block w-2 h-4 bg-white animate-pulse mt-2"></span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ResultScreen = ({ isSuccess, onClose }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-4 fade-in backdrop-blur-md bg-black/60 fixed inset-0 z-50">
      <div className="gaming-card w-full max-w-md text-center transform scale-110">
        {isSuccess ? (
          <div className="text-success fade-in">
            <CheckCircle size={64} className="mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Guild Glory Bot Under Process</h2>
            <p className="text-slate-300 mb-8">Bot Successfully Sent To Your Guild</p>
          </div>
        ) : (
          <div className="text-error fade-in">
            <div className="w-16 h-16 rounded-full border-4 border-error flex items-center justify-center text-3xl font-bold mx-auto mb-4">!</div>
            <h2 className="text-2xl font-bold mb-2">Guild Glory Bot Busy</h2>
            <p className="text-slate-300 mb-8">Please Try Again Later</p>
          </div>
        )}
        <button onClick={onClose} className="btn btn-primary w-full">Back to Dashboard</button>
      </div>
    </div>
  );
};

// Simple local storage history for demonstration, would be Firebase in prod
const HistoryScreen = ({ onBack, history }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 fade-in">
      <div className="flex items-center gap-4 mb-8 bg-slate-800 p-4 rounded-xl border border-slate-700">
        <button onClick={onBack} className="btn bg-slate-700 hover:bg-slate-600 px-4 py-2 text-sm">&larr; Back</button>
        <h1 className="text-2xl font-bold">Your Request History</h1>
      </div>

      {history.length === 0 ? (
        <div className="text-center p-12 text-slate-500">
          <Clock size={48} className="mx-auto mb-4 opacity-50" />
          <p>No history found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((h, i) => (
            <div key={i} className="gaming-card p-4 flex flex-col md:flex-row justify-between items-center gap-4 border-l-4" style={{borderLeftColor: h.isSuccess ? 'var(--success-color)' : 'var(--error-color)'}}>
              <div>
                <p className="font-bold font-mono text-lg">{h.uid}</p>
                <p className="text-xs text-slate-400">Server: {h.server} &bull; Points: {h.gloryPoint}</p>
                <p className="text-xs text-slate-500 mt-1">{new Date(h.timestamp).toLocaleString()}</p>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${h.isSuccess ? 'bg-green-900/50 text-success' : 'bg-red-900/50 text-error'}`}>
                  {h.isSuccess ? 'SUCCESS' : 'FAILED'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const AdminPanel = ({ onBack, allHistory, setAllHistory }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const clearHistory = () => {
    if(confirm('Are you sure you want to delete all records?')) {
      setAllHistory([]);
    }
  };

  const filtered = allHistory.filter(h => h.uid.includes(searchTerm) || h.userId.includes(searchTerm));

  return (
    <div className="w-full max-w-6xl mx-auto p-4 fade-in">
      <div className="flex justify-between items-center mb-8 bg-slate-800 p-4 rounded-xl border border-slate-700">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="btn bg-slate-700 hover:bg-slate-600 px-4 py-2 text-sm">&larr; Back</button>
          <h1 className="text-2xl font-bold text-purple-400">Admin Dashboard</h1>
        </div>
        <button onClick={clearHistory} className="btn bg-red-900/50 text-error hover:bg-red-900 px-4 py-2 text-sm flex gap-2">
          <Trash2 size={16}/> Clear All
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-800 p-4 rounded-lg text-center border border-slate-700">
          <p className="text-xs text-text-secondary uppercase">Total Records</p>
          <p className="text-2xl font-bold mt-1">{allHistory.length}</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg text-center border border-slate-700">
          <p className="text-xs text-text-secondary uppercase">Success</p>
          <p className="text-2xl font-bold text-success mt-1">{allHistory.filter(h=>h.isSuccess).length}</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg text-center border border-slate-700">
          <p className="text-xs text-text-secondary uppercase">Failed</p>
          <p className="text-2xl font-bold text-error mt-1">{allHistory.filter(h=>!h.isSuccess).length}</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg text-center border border-slate-700">
          <p className="text-xs text-text-secondary uppercase">Users</p>
          <p className="text-2xl font-bold text-primary mt-1">{new Set(allHistory.map(h=>h.userId)).size}</p>
        </div>
      </div>

      <div className="gaming-card p-0 overflow-hidden">
        <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
          <h3 className="font-bold">Database Records</h3>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-3 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search UID..." 
              className="pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-primary"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/80 text-slate-400">
              <tr>
                <th className="p-4">Date</th>
                <th className="p-4">User</th>
                <th className="p-4">Guild UID</th>
                <th className="p-4">Server</th>
                <th className="p-4">Points</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((h, i) => (
                <tr key={i} className="border-b border-slate-800 hover:bg-slate-800/30">
                  <td className="p-4">{new Date(h.timestamp).toLocaleString()}</td>
                  <td className="p-4 font-bold text-primary">{h.userId}</td>
                  <td className="p-4 font-mono">{h.uid}</td>
                  <td className="p-4">{h.server}</td>
                  <td className="p-4">{h.gloryPoint}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${h.isSuccess ? 'text-success bg-green-900/30' : 'text-error bg-red-900/30'}`}>
                      {h.isSuccess ? 'SUCCESS' : 'FAILED'}
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="6" className="p-8 text-center text-slate-500">No records found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- Main App Controller ---

function App() {
  const [screen, setScreen] = useState('LOGIN'); // LOGIN, TASKS, LOADING, DASHBOARD, PROCESSING, HISTORY, ADMIN
  const [currentUser, setCurrentUser] = useState(null);
  
  // App State
  const [history, setHistory] = useState([]); // This would be fetched from Firebase in reality
  const [currentRequest, setCurrentRequest] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [resultSuccess, setResultSuccess] = useState(false);

  const handleLogin = (userId) => {
    setCurrentUser(userId);
    setScreen('TASKS');
  };

  const handleTasksComplete = () => {
    setScreen('LOADING');
  };

  const handleLoadingComplete = () => {
    setScreen('DASHBOARD');
  };

  const handleConnect = (data) => {
    // Check retry rules: if user already has a success, block
    const userHistory = history.filter(h => h.userId === currentUser);
    if (userHistory.some(h => h.isSuccess)) {
      alert("You have already successfully sent the Guild Glory Bot. You cannot use it again.");
      return;
    }

    setCurrentRequest(data);
    setScreen('PROCESSING');
  };

  const handleProcessFinish = (isSuccess) => {
    setResultSuccess(isSuccess);
    setShowResult(true);
    
    // Save to history
    const newRecord = {
      ...currentRequest,
      userId: currentUser,
      isSuccess,
      timestamp: new Date().toISOString()
    };
    setHistory(prev => [newRecord, ...prev]);
  };

  const closeResult = () => {
    setShowResult(false);
    setScreen('DASHBOARD');
  };

  return (
    <div className="App">
      {screen === 'LOGIN' && <LoginScreen onLogin={handleLogin} />}
      {screen === 'TASKS' && <TaskVerificationScreen onComplete={handleTasksComplete} />}
      {screen === 'LOADING' && <LoadingScreen onComplete={handleLoadingComplete} />}
      {screen === 'DASHBOARD' && (
        <DashboardScreen 
          onConnect={handleConnect} 
          goHistory={() => setScreen('HISTORY')} 
          isAdmin={currentUser === 'admin'}
          goAdmin={() => setScreen('ADMIN')}
        />
      )}
      {screen === 'PROCESSING' && <ProcessingScreen onFinish={handleProcessFinish} />}
      {screen === 'HISTORY' && (
        <HistoryScreen 
          onBack={() => setScreen('DASHBOARD')} 
          history={history.filter(h => h.userId === currentUser || currentUser === 'admin')} 
        />
      )}
      {screen === 'ADMIN' && (
        <AdminPanel 
          onBack={() => setScreen('DASHBOARD')}
          allHistory={history}
          setAllHistory={setHistory}
        />
      )}

      {showResult && <ResultScreen isSuccess={resultSuccess} onClose={closeResult} />}
    </div>
  );
}

export default App;
