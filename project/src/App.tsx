import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthForm } from './components/auth/AuthForm';
import { ProtectedRoute } from './components/ProtectedRoute';
import Layout from './components/Layout';
import { DashboardView } from './components/dashboard/DashboardView';
import { TasksView } from './components/tasks/TasksView';
import { SettingsView } from './components/settings/SettingsView';
import { NutritionView } from './components/nutrition/NutritionView';
import { ShoppingView } from './components/shopping/ShoppingView';
import { RecipesView } from './components/recipes/RecipesView';
import { PantryView } from './components/pantry/PantryView';
import { ExerciseView } from './components/exercise/ExerciseView';

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/auth" element={<AuthForm />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Layout>
                  <DashboardView />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/tasks" element={
              <ProtectedRoute>
                <Layout>
                  <TasksView />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/shopping" element={
              <ProtectedRoute>
                <Layout>
                  <ShoppingView />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/recipes" element={
              <ProtectedRoute>
                <Layout>
                  <RecipesView />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/pantry" element={
              <ProtectedRoute>
                <Layout>
                  <PantryView />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/exercise" element={
              <ProtectedRoute>
                <Layout>
                  <ExerciseView />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/nutrition" element={
              <ProtectedRoute>
                <Layout>
                  <NutritionView />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Layout>
                  <SettingsView />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}