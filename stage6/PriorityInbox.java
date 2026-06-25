import java.net.URI;
import java.net.http.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

import com.google.gson.*;

class Notification {

    String ID;
    String Type;
    String Message;
    String Timestamp;

    int getPriority() {

        switch (Type) {

            case "Placement":
                return 3;

            case "Result":
                return 2;

            default:
                return 1;
        }
    }

    LocalDateTime getTime() {

        DateTimeFormatter formatter =
                DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        return LocalDateTime.parse(Timestamp, formatter);
    }

}

public class PriorityInbox {

    public static void main(String[] args) throws Exception {

        String TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJtYWRodXJ5YWd1bnVwdWRpQGdtYWlsLmNvbSIsImV4cCI6MTc4MjM4MjI4MiwiaWF0IjoxNzgyMzgxMzgyLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiOTk1MmYxZmQtOTQ4YS00MjU5LWFmMDUtMDkyMWRiZTRkNzU3IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiZ3VudXB1ZGkgZHVyZ2EgbWFkaHVyeWEiLCJzdWIiOiJjYTkzMjM1Ni01NmNkLTQwNDktYTk5NC1lZWZmNzJiYWFhODcifSwiZW1haWwiOiJtYWRodXJ5YWd1bnVwdWRpQGdtYWlsLmNvbSIsIm5hbWUiOiJndW51cHVkaSBkdXJnYSBtYWRodXJ5YSIsInJvbGxObyI6IjI0YjA1YTA1MDgiLCJhY2Nlc3NDb2RlIjoiYWhYanZwIiwiY2xpZW50SUQiOiJjYTkzMjM1Ni01NmNkLTQwNDktYTk5NC1lZWZmNzJiYWFhODciLCJjbGllbnRTZWNyZXQiOiJHU1J2ZHNZR2NaR2N1aGJqIn0.N1uiUlLPusvhEnxDafq9NbaWKy4smJIzTT4slQKR7cE";

        HttpRequest request = HttpRequest.newBuilder()
                .uri(new URI("http://4.224.186.213/evaluation-service/notifications"))
                .header("Authorization", "Bearer " + TOKEN)
                .GET()
                .build();

        HttpClient client = HttpClient.newHttpClient();

        HttpResponse<String> response =
                client.send(request, HttpResponse.BodyHandlers.ofString());

        JsonObject object =
                JsonParser.parseString(response.body()).getAsJsonObject();

        JsonArray array = object.getAsJsonArray("notifications");

        List<Notification> list = new ArrayList<>();

        Gson gson = new Gson();

        for (JsonElement e : array) {

            list.add(gson.fromJson(e, Notification.class));

        }

        list.sort((a, b) -> {

            if (a.getPriority() != b.getPriority())

                return b.getPriority() - a.getPriority();

            return b.getTime().compareTo(a.getTime());

        });

        System.out.println("Top 10 Notifications\n");

        for (int i = 0; i < Math.min(10, list.size()); i++) {

            Notification n = list.get(i);

            System.out.println(
                    (i + 1) +
                            ". " +
                            n.Type +
                            " | " +
                            n.Message +
                            " | " +
                            n.Timestamp
            );

        }

    }

}