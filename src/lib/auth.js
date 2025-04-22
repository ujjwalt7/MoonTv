import { supabase } from "./supabase";

export async function signInWithEmail(email, password, setUser) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    setUser(data.user);
    return { user: data.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
}

export async function signUpWithEmail(email, password, setUser) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          email_confirmed: true
        }
      }
    });

    if (error) throw error;

    // Sign in immediately after signup
    const { data: signInData } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    setUser(signInData.user);
    return { user: signInData.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
}