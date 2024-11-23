export default function Profile({ profile }) {
    return (
        <div id="profile">
            <h1>{profile.name}</h1>
            <p>{profile.description}</p>
            <p>followers: {profile.followers_count}</p>
            <p>followees: {profile.followees_count}</p>
            {profile.avatar_url && <img alt={"profile"} src={profile.avatar_url}/>}
        </div>
    )
}